import {OfferEntity} from './offer.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto';
import {OfferServiceInterface} from './offer-service.interface';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.types.js';
import {DEFAULT_OFFER_COUNT, DEFAULT_OFFER_PREMIUM_COUNT} from '../../const.js';
import {SortType} from '../../types/sort-type.enum.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}


  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['host'])
      .exec();
  }

  public async find(count?:number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'hoster'
          },
        },
        { $addFields:
          { host: { $arrayElemAt: ['$hoster', 0]} }
        },
        { $unset: ['hoster']},
        { $limit: limit},
        { $sort: { offerCount: SortType.Down } }
      ])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['host'])
      .exec();
  }

  public async findByPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isPremium: true}, {}, {DEFAULT_OFFER_PREMIUM_COUNT})
      .populate(['host'])
      .exec();
  }

  public async findByFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isFavorite: true}, {}, {DEFAULT_OFFER_COUNT})
      .populate(['host'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async updateFavoriteById(offerId: string, favoriteStatus: boolean): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: favoriteStatus}, {new: true})
      .populate(['host'])
      .exec();
  }

  public async updateRating(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: {offerId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$offerId', '$offerId'] } } },
              { $project: { rating: 1}}
            ],
            as: 'allRating'
          },
        },
        { $addFields:
          {commentCount: {$size: '$allRating'}, rating: {$trunc: {$avg: '$allRating'}}}
        },
        { $unset: ['allRating']},
      ]).exec();

  }
}

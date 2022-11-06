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
import mongoose from 'mongoose';
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

  public async findById(offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.aggregate([
      {$match:{'_id':new mongoose.Types.ObjectId(offerId)}},
      {$lookup: {
        from: 'users',
        localField: 'host',
        foreignField: '_id',
        as: 'hoster'
      },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          pipeline: [
            {$group : {
              _id : null,
              rating: { $avg: '$rating' },
              count: { $count: { } }
            }},
          ],
          as: 'allRating'
        },
      },
      { $addFields:
    { host: {$arrayElemAt: ['$hoster', 0]},
      commentCount: {$ifNull:[{$arrayElemAt: ['$allRating.count', 0]}, 0]},
      rating: {$ifNull:[{$trunc : [{$arrayElemAt: ['$allRating.rating', 0]}, 1]}, 0]},
    }
      },
      { $unset: ['hoster','allRating']},
    ]);

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
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            pipeline: [
              {$group : {
                _id : null,
                rating: { $avg: '$rating' },
                count: { $count: { } }
              }},
            ],
            as: 'allRating'
          },
        },
        { $addFields:
        { host: {$arrayElemAt: ['$hoster', 0]},
          commentCount: {$ifNull:[{$arrayElemAt: ['$allRating.count', 0]}, 0]},
          rating: {$ifNull:[{$trunc : [{$arrayElemAt: ['$allRating.rating', 0]}, 1]}, 0]},
        }
        },
        { $unset: ['hoster', 'allRating']},
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

  public async findByPremium(city:string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {$match:{'isPremium': true}},
        {$match:{'city': city}},
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'hoster'
          },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            pipeline: [
              {$group : {
                _id : null,
                rating: { $avg: '$rating' },
                count: { $count: { } }
              }},
            ],
            as: 'allRating'
          },
        },
        { $addFields:
      { host: {$arrayElemAt: ['$hoster', 0]},
        commentCount: {$ifNull:[{$arrayElemAt: ['$allRating.count', 0]}, 0]},
        rating: {$ifNull:[{$trunc : [{$arrayElemAt: ['$allRating.rating', 0]}, 1]}, 0]},
      }
        },
        { $unset: ['hoster', 'allRating']},
        { $limit: DEFAULT_OFFER_PREMIUM_COUNT},
        { $sort: { offerCount: SortType.Down } }
      ]).exec();


  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

}

import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {FavoritesServiceInterface} from './favorites-service.interface.js';
import {Component} from '../../types/component.types.js';
import {FavoritesEntity} from './favorites.entity.js';
import CreateFavoritesDto from './dto/create-favorites.dto.js';

@injectable()
export default class FavoritesService implements FavoritesServiceInterface {
  constructor(
    @inject(Component.FavoritesModel) private readonly favoritesModel: types.ModelType<FavoritesEntity>
  ) {}

  public async create(dto: CreateFavoritesDto): Promise<DocumentType<FavoritesEntity>> {
    const favorites = await this.favoritesModel.create(dto);
    return favorites.populate('userId');
  }

  public async findByUserId(userId: string): Promise<DocumentType<FavoritesEntity>| null> {
    return this.favoritesModel
      .findOne({userId})
      .populate(['offerId', 'userId']);
  }

  public async deleteByUserId(userId: string): Promise<number> {
    const result = await this.favoritesModel
      .deleteMany({userId})
      .exec();

    return result.deletedCount;
  }

  public async addFavoriteByUserId(userId: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null> {
    return this.favoritesModel
      .findOneAndUpdate({userId}, {$push: {'offerId': offerId }}, {new: true})
      .populate(['offerId', 'userId']).exec();
  }

  public async deleteFavoriteByUserId(userId: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null> {
    return this.favoritesModel
      .findOneAndUpdate({userId}, {$pull: {'offerId': offerId }}, {new: true})
      .populate(['offerId', 'userId']).exec();
  }

}

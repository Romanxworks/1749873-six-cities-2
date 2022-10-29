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
    return favorites.populate('email');
  }

  public async findByUserEmail(email: string): Promise<DocumentType<FavoritesEntity>| null> {
    return this.favoritesModel
      .findOne({email})
      .populate(['offerId']);
  }

  public async deleteByUserEmail(email: string): Promise<number> {
    const result = await this.favoritesModel
      .deleteMany({email})
      .exec();

    return result.deletedCount;
  }

  public async addFavorite(email: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null> {
    return this.favoritesModel
      .findOneAndUpdate({email}, {$push: {'offerId': offerId }}, {new: true})
      .populate(['offerId']).exec();
  }

  public async deleteFavorite(email: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null> {
    return this.favoritesModel
      .findOneAndUpdate({email}, {$pull: {'offerId': offerId }}, {new: true})
      .populate(['offerId']).exec();
  }

}

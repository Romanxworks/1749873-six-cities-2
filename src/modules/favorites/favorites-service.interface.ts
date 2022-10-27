import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {FavoritesEntity} from './favorites.entity.js';
import CreateFavoritesDto from './dto/create-favorites.dto.js';

export interface FavoritesServiceInterface {
  create(dto: CreateFavoritesDto): Promise<DocumentType<FavoritesEntity>>;
  findByUserId(userId: string): Promise<DocumentType<FavoritesEntity>| null>;
  deleteByUserId(offerId: string): Promise<number | null>;
  addFavoriteByUserId(userId: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null>;
  deleteFavoriteByUserId(userId: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null>;
}

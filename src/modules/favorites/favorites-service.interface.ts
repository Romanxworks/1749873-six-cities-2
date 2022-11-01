import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {FavoritesEntity} from './favorites.entity.js';
import CreateFavoritesDto from './dto/create-favorites.dto.js';

export interface FavoritesServiceInterface {
  create(dto: CreateFavoritesDto): Promise<DocumentType<FavoritesEntity>>;
  findByUserEmail(email: string): Promise<DocumentType<FavoritesEntity>| null>;
  deleteByUserEmail(email: string): Promise<number | null>;
  addFavorite(email: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null>;
  deleteFavorite(email: string, offerId: string): Promise<DocumentType<FavoritesEntity> | null>;
}

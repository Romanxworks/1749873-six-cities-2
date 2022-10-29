import typegoose, {getModelForClass, Ref, defaultClasses} from '@typegoose/typegoose';
import {OfferEntity} from '../offers/offer.entity.js';

const {prop, modelOptions} = typegoose;

export interface FavoritesEntity extends  defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorites'
  }
})
export class FavoritesEntity extends defaultClasses.TimeStamps {

  @prop({
    ref: OfferEntity,
    required: true,
    default: []
  })
  public offerId!: Ref<OfferEntity>[];

  @prop({
    unique: true,
    required: true
  })
  public email!: string;

}

export const FavoritesModel = getModelForClass(FavoritesEntity);

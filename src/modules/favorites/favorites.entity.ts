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
    unique: true,
    required: true
  })
  public email!: string;

  @prop({
    ref: OfferEntity,
    required: true,
    _id: false,
    default: []
  })
  public offerId!: Ref<OfferEntity>[];

}

export const FavoritesModel = getModelForClass(FavoritesEntity);

import typegoose, {getModelForClass, Ref, defaultClasses} from '@typegoose/typegoose';
import {UserEntity} from '../users/user.entity.js';
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
    _id: false
  })
  public offerId!: Ref<OfferEntity>[];

  @prop({
    ref: UserEntity,
    unique: true,
    required: true
  })
  public userId!: Ref<UserEntity>;

}

export const FavoritesModel = getModelForClass(FavoritesEntity);

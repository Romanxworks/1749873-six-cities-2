import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import {
  MIN_LENGTH_TITLE,
  MAX_LENGTH_TITLE,
  MIN_LENGTH_DESCRIPTION,
  MAX_LENGTH_DESCRIPTION,
  MIN_RATING,
  MAX_RATING,
  MIN_ROOMS,
  MAX_ROOMS,
  MIN_ADULTS,
  MAX_ADULTS,
  MIN_PRICE,
  MAX_PRICE
} from '../../const.js';
import { UserEntity } from '../users/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps  {


  @prop({required: true, default: []})
  public images!: string[];

  @prop({
    required: true,
    minlength: [MIN_LENGTH_TITLE, `Min length for title is ${MIN_LENGTH_TITLE}`],
    maxlength: [MAX_LENGTH_TITLE, `Max length for title is ${MAX_LENGTH_TITLE}`],
    trim: true,
    default: ''})
  public title!: string;

  @prop({required: true,
    trim: true,
    minlength: [MIN_LENGTH_DESCRIPTION, `Min length for description is ${MIN_LENGTH_DESCRIPTION}`],
    maxlength: [MAX_LENGTH_DESCRIPTION, `Max length for description is ${MAX_LENGTH_DESCRIPTION}`],
    default: ''})
  public description!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true, default: ''})
  public type!: string;

  @prop({required: true,
    minlength: [MIN_ROOMS, `Min length for bedrooms is ${MIN_ROOMS}`],
    maxlength: [MAX_ROOMS, `Max length for bedrooms is ${MAX_ROOMS}`],
    default: 1})
  public bedrooms!: number;

  @prop({required: true,
    minlength: [MIN_ADULTS, `Min length for adults is ${MIN_ADULTS}`],
    maxlength: [MAX_ADULTS, `Max length for adults is ${MAX_ADULTS}`],
    default: 1})
  public maxAdults!: number;

  @prop({required: true, default: []})
  public goods!: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public host!: Ref<UserEntity>;

  @prop({required: true,
    minlength: [MIN_RATING, `Min length for rating is ${MIN_RATING}`],
    maxlength: [MAX_RATING, `Max length for rating is ${MAX_RATING}`],
    default: 1
  })
  public rating!: number;

  @prop({required: true, default: false})
  public isFavorite!: boolean;

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true,
    minlength: [MIN_PRICE, `Min length for price is ${MIN_PRICE}`],
    maxlength: [MAX_PRICE, `Max length for price is ${MAX_PRICE}`],
    default: 100})
  public price!: number;

  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;


  @prop({required: true})
  public city!: string;

  @prop({required: true})
  public previewImage!: string;

  @prop({
    required: true,
    default: 0})
  public commentCount!: number;
}

export const OfferModel = getModelForClass(OfferEntity);

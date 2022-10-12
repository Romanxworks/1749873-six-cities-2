// import {Offer} from '../../types/offer.js';
import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
// import {
//   MIN_LENGTH_TITLE,
//   MAX_LENGTH_TITLE,
//   MIN_LENGTH_DESCRIPTION,
//   MAX_LENGTH_DESCRIPTION,
//   MIN_RATING,
//   MAX_RATING,
//   MIN_ROOMS,
//   MAX_ROOMS,
//   MIN_ADULTS,
//   MAX_ADULTS,
//   MIN_PRICE,
//   MAX_PRICE
// } from '../../const.js';
import { UserEntity } from '../users/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps  {
  // constructor(data: Offer) {
  //   super();

  //   this.images = data.images;
  //   this.title = data.title;
  //   this.description = data.description;
  //   this.date =  data.date;
  //   this.type =  data.type;
  //   this.bedrooms =  data.bedrooms;
  //   this.maxAdults = data.maxAdults;
  //   this.goods = data.goods;
  //   this.host = data.host;
  //   this.rating = data.rating;
  //   this.isFavorite = data.isFavorite;
  //   this.isPremium = data.isPremium;
  //   this.price = data.price;
  //   this.location = data.location;
  //   this.city = data.city;
  //   this.previewImage = data.previewImage;

  // }

  @prop({required: true, default: []})
  public images!: string[];

  @prop({
    required: true,
    // minlength: [MIN_LENGTH_TITLE, `Min length for title is ${MIN_LENGTH_TITLE}`],
    // maxlength: [MAX_LENGTH_TITLE, `Max length for title is ${MAX_LENGTH_TITLE}`],
    trim: true,
    default: ''})
  public title!: string;

  @prop({required: true,
    trim: true,
    // minlength: [MIN_LENGTH_DESCRIPTION, `Min length for description is ${MIN_LENGTH_DESCRIPTION}`],
    // maxlength: [MAX_LENGTH_DESCRIPTION, `Max length for description is ${MAX_LENGTH_DESCRIPTION}`],
    default: ''})
  public description!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true, default: ''})
  public type!: string;

  @prop({required: true,
    // minlength: [MIN_ROOMS, `Min length for bedrooms is ${MIN_ROOMS}`],
    // maxlength: [MAX_ROOMS, `Max length for bedrooms is ${MAX_ROOMS}`],
    default: 1})
  public bedrooms!: number;

  @prop({required: true,
    // minlength: [MIN_ADULTS, `Min length for adults is ${MIN_ADULTS}`],
    // maxlength: [MAX_ADULTS, `Max length for adults is ${MAX_ADULTS}`],
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
    // minlength: [MIN_RATING, `Min length for rating is ${MIN_RATING}`],
    // maxlength: [MAX_RATING, `Max length for rating is ${MAX_RATING}`]
  })
  public rating!: number;

  @prop({required: true, default: false})
  public isFavorite!: boolean;

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true,
    // minlength: [MIN_PRICE, `Min length for price is ${MIN_PRICE}`],
    // maxlength: [MAX_PRICE, `Max length for price is ${MAX_PRICE}`],
    default: 100})
  public price!: number;

  @prop({required: true})
  public location!: {
    latitude: number,
    longitude: number,
  };

  @prop({required: true})
  public city!: string;

  @prop({required: true})
  public previewImage!: string;
}

export const OfferModel = getModelForClass(OfferEntity);

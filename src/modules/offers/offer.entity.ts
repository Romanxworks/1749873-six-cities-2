import {Offer} from '../../types/offer.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {User} from '../../types/user.js';
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

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  constructor(data: Offer) {
    super();

    this.images = data.images;
    this.title = data.title;
    this.description = data.description;
    this.date =  data.date;
    this.type =  data.type;
    this.bedrooms =  data.bedrooms;
    this.maxAdults = data.maxAdults;
    this.goods = data.goods;
    this.host = data.host;
    this.rating = data.rating;
    this.isFavorite = data.isFavorite;
    this.isPremium = data.isPremium;
    this.price = data.price;
    this.location = data.location;
    this.city = data.city;
    this.previewImage = data.previewImage;

  }

  @prop({required: true, default: []})
  public images!: string[];

  @prop({
    required: true,
    minlength: [MIN_LENGTH_TITLE, 'Min length for name is 1'],
    maxlength: [MAX_LENGTH_TITLE, 'Min length for name is 15'],
    default: ''})
  public title!: string;

  @prop({required: true,
    minlength: [MIN_LENGTH_DESCRIPTION, 'Min length for name is 1'],
    maxlength: [MAX_LENGTH_DESCRIPTION, 'Min length for name is 15'],
    default: ''})
  public description!: string;

  @prop({required: true, default: ''})
  public date!: Date;

  @prop({required: true, default: ''})
  public type!: string;

  @prop({required: true,
    minlength: [MIN_ROOMS, 'Min length for name is 1'],
    maxlength: [MAX_ROOMS, 'Min length for name is 15'],
    default: '1'})
  public bedrooms!: number;

  @prop({required: true,
    minlength: [MIN_ADULTS, 'Min length for name is 1'],
    maxlength: [MAX_ADULTS, 'Min length for name is 15'],
    default: ''})
  public maxAdults!: number;

  @prop({required: true, default: ['']})
  public goods!: string[];

  @prop({required: true, default: ''})
  public host!: User;

  @prop({required: true,
    minlength: [MIN_RATING, 'Min length for name is 1'],
    maxlength: [MAX_RATING, 'Min length for name is 15'],
    default: ''})
  public rating!: number;

  @prop({required: true, default: false})
  public isFavorite!: boolean;

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true,
    minlength: [MIN_PRICE, 'Min length for name is 1'],
    maxlength: [MAX_PRICE, 'Min length for name is 15'],
    default: '0'})
  public price!: number;

  @prop({required: true, default: {}})
  public location!: {
    latitude: number,
    longitude: number,
  };

  @prop({required: true, default: ''})
  public city!: string;

  @prop({required: true, default: ''})
  public previewImage!: string;
}

export const UserModel = getModelForClass(OfferEntity);

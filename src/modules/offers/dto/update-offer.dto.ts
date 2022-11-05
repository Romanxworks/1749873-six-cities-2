import {OfferType} from '../../../types/offer-type.enum.js';
import {OfferCity} from '../../../types/offer-city.enum.js';
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
} from '../../../const.js';
import {IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsBoolean, IsLatitude, IsLongitude,} from 'class-validator';

export default class UpdateOfferDto {
  @IsArray({message: 'Field images must be an array'})
  @MaxLength(256, {each: true, message: 'Too short for field «image»'})
  public images?: string[];

  @MinLength(MIN_LENGTH_TITLE, {message: `Minimum title length must be ${MIN_LENGTH_TITLE}`})
  @MaxLength(MAX_LENGTH_TITLE, {message: `Maximum title length must be ${MAX_LENGTH_TITLE}`})
  public title?: string;

  @MinLength(MIN_LENGTH_DESCRIPTION, {message: `Minimum description length must be ${MIN_LENGTH_DESCRIPTION}`})
  @MaxLength(MAX_LENGTH_DESCRIPTION, {message: `Maximum description length must be ${MAX_LENGTH_DESCRIPTION}`})
  public description?: string;

  @IsDateString({}, {message: 'date must be valid ISO date'})
  public date?: Date;

  @IsEnum(OfferType, {message: 'type must be apartment, house, room or hotel'})
  public type?: string;

  @IsInt({message: 'bedrooms must be an integer'})
  @Min(MIN_ROOMS, {message: `Minimum bedrooms is ${MIN_ROOMS}`})
  @Max(MAX_ROOMS, {message: `Maximum bedrooms is ${MAX_ROOMS}`})
  public bedrooms?: number;

  @IsInt({message: 'maxAdults must be an integer'})
  @Min(MIN_ADULTS, {message: `Minimum maxAdults is ${MIN_ADULTS}`})
  @Max(MAX_ADULTS, {message: `Maximum maxAdults is ${MAX_ADULTS}`})
  public maxAdults?: number;

  @IsArray({message: 'Field goods must be an array'})
  public goods?: string[];

  @IsInt({message: 'Rating must be an integer'})
  @Min(MIN_RATING, {message: `Minimum rating is ${MIN_RATING}`})
  @Max(MAX_RATING, {message: `Maximum rating is ${MAX_RATING}`})
  public rating?: number;

  @IsBoolean({message: 'isPremium must be an boolean'})
  public isPremium?: boolean;

  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_PRICE, {message: `Minimum price is ${MIN_PRICE}`})
  @Max(MAX_PRICE, {message: `Maximum price is ${MAX_PRICE}`})
  public price?: number;

  @IsLatitude({message: 'latitude must be an latitude'})
  public latitude?: number;

  @IsLongitude({message: 'longitude must be an longitude'})
  public longitude?: number;


  @IsEnum(OfferCity, {message: 'city must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf'})
  public city?: string;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public previewImage?: string;
}

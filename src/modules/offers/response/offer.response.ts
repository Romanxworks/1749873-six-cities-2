import {Expose, Type} from 'class-transformer';
import UserResponse from '../../users/response/user.response.js';

export default class OfferResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({name: 'createdAt'})
  public date!: Date;

  @Expose()
  public type!: string;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public goods!: string[];

  @Expose({name: 'host'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public rating!: number;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public price!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public commentCount!: number;
}

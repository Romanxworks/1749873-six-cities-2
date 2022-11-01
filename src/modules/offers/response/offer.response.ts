import {Expose} from 'class-transformer';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public type!: string;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public goods!: string[];

  @Expose()
  public host!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public price!: number;

  @Expose()
  public location!: {
        latitude: number,
        longitude: number,
  };

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public commentCount!: number;
}

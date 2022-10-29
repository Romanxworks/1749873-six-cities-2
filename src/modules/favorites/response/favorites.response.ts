import {Expose} from 'class-transformer';

export default class FavoritesResponse {
  @Expose()
  public offerId!: string[];

}

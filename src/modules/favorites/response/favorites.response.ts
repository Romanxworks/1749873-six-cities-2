import {Expose, Type} from 'class-transformer';
import OfferResponse from '../../offers/response/offer.response.js';

export default class FavoritesResponse {
  @Expose({name: 'offerId'})
  @Type(() => OfferResponse)
  public offers!: OfferResponse[];

}

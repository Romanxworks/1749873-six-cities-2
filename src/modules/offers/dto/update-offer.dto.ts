export default class UpdateOfferDto {
  public images?: string[];
  public title?: string;
  public description?: string;
  public date?: Date;
  public type?: string;
  public bedrooms?: number;
  public maxAdults?: number;
  public goods?: string[];
  public rating?: number;
  public isFavorite?: boolean;
  public isPremium?: boolean;
  public price?: number;
  public location?: {
        latitude: number,
        longitude: number,
    };

  public city?: string;
  public previewImage?: string;
}

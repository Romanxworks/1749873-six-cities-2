import {readFileSync} from 'fs';
import {Offer} from '../../types/offer.js';
import {FileReaderInterface} from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }
    return this.rawData
      .split('\r\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('!'))
      .map(([
        title,
        description,
        createdDate,
        city,
        previewImage,
        images,
        isFavorite,
        isPremium,
        rating,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        name,
        email,
        avatar,
        password,
        status,
        latitude,
        longitude,]) => ({
        title,
        description,
        date: new Date(createdDate),
        city,
        previewImage,
        images: images.split(';'),
        isFavorite: Boolean(isFavorite),
        isPremium: Boolean(isPremium),
        rating: Number.parseInt(rating, 10),
        type,
        bedrooms: Number.parseInt(bedrooms, 10),
        maxAdults: Number.parseInt(maxAdults, 10),
        price: Number.parseInt(price, 10),
        goods:goods.split(';'),
        host:{
          name,
          email,
          avatarUrl: avatar,
          password,
          type: Boolean(status),
        },
        location:{
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        }

      }));
  }
}

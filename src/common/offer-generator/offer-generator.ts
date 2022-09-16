import {MockData} from '../../types/mock-data.js';
import dayjs from 'dayjs';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {
  MIN_ROOMS,
  MAX_ROOMS,
  MIN_RATING,
  MAX_RATING,
  MIN_ADULTS,
  MAX_ADULTS,
  MIN_PRICE,
  MAX_PRICE,
  MIN_LATITUDE,
  MAX_LATITUDE,
  MIN_LONGITUDE,
  MAX_LONGITUDE,
  FIRST_WEEK_DAY,
  LAST_WEEK_DAY,
} from '../../const.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const city = getRandomItem<string>(this.mockData.cities);
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const images = getRandomItems<string>(this.mockData.images, true).join(';');
    const previewImage = getRandomItem<string>(this.mockData.images);
    const avatar = getRandomItem<string>(this.mockData.images);
    const type = getRandomItem<string>(this.mockData.types);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const email = getRandomItem<string>(this.mockData.emails);
    const name = getRandomItem<string>(this.mockData.names);
    const password = getRandomItem<string>(this.mockData.passwords);
    const isFavorite = generateRandomValue(0, 1).toString();
    const isPremium = generateRandomValue(0, 1).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const status = generateRandomValue(0, 1).toString();
    const bedrooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const latitude = generateRandomValue(MIN_LATITUDE, MAX_LATITUDE, 5).toString();
    const longitude = generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE, 5).toString();
    const createdDate =  dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();

    return [
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
      longitude,
    ].join('\t');
  }
}

import {Offer} from '../types/offer.js';
import crypto from 'crypto';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title,
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
    longitude] = tokens;

  return {
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

  }as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';


export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

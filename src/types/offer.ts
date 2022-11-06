import {User} from './user.js';
export type Offer = {
    images: string[];
    title: string;
    description: string;
    date: Date;
    type: string;
    bedrooms: number;
    maxAdults: number;
    goods: string[];
    host: User;
    rating: number;
    isFavorite: boolean;
    isPremium: boolean;
    price: number;
    latitude: number;
    longitude: number;
    city: string;
    previewImage: string
}

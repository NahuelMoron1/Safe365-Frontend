import { InjectionToken } from '@angular/core';
import { Review } from '../models/Review';
import { User } from '../models/User';

export const TIME_SLOTS = new InjectionToken<string[]>('TIME_SLOTS');
export const SELECTED_DATE = new InjectionToken<Date | null>('SELECTED_DATE');

export const ATTENDANT = new InjectionToken<User>('ATTENDANT');
export const USER = new InjectionToken<User>('USER');

export const EXISTING_COMMENTS = new InjectionToken<string>(
  'EXISTING_COMMENTS'
);
export const REVIEWS = new InjectionToken<Review[]>('REVIEWS');
export const REVIEW = new InjectionToken<Review>('REVIEW');

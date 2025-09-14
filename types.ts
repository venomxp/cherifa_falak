import { translations } from './localization/translations';

export enum Page {
  SPLASH,
  HOME,
  TAROT,
  HOROSCOPE,
  NUMEROLOGY,
  COMPATIBILITY,
  MORE,
  PRIVATE_READING,
  SETTINGS,
}

// Redefine TranslationKey to be derived from one of the translation objects
export type TranslationKey = keyof typeof translations.en;


export interface ZodiacSign {
  value: string; // The value for API calls, e.g., 'aries'
  icon: string;
  translationKey: TranslationKey; // Key for retrieving the translated name
}

export interface TarotCardInfo {
  english: string;
  arabic: string;
}
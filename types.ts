import { translations } from './localization/translations';

export enum Page {
  SPLASH,
  HOME,
  TAROT,
  HOROSCOPE,
  NUMEROLOGY,
  COMPATIBILITY,
  PRIVATE_READING,
  SETTINGS,
  FALK_LYOM_WELCOME,
  FALK_LYOM_GENDER,
  FALK_LYOM_SKIN_TONE,
  FALK_LYOM_CATEGORY,
  FALK_LYOM_RESULT,
  PROFILE,
  PRIVACY_POLICY,
  TERMS_CONDITIONS,
  HELP_FAQ,
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

export interface MoroccanTarotCard {
  name: string;
  key: string;
}

export type ReadingType = 'Tarot' | 'Numerology' | 'Compatibility' | 'Horoscope' | 'Falk Lyom';

export interface ReadingHistoryItem {
  id: number; // Using timestamp as a unique ID
  type: ReadingType;
  title: string;
  content: string;
  date: string; // ISO string date
}

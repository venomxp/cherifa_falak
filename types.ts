// FIX: Removed the triple-slash directive for "vite/client" because it was causing a
// type resolution error and the types for `import.meta.env` are not used in the codebase.
// The `declare var process` below handles type checking for `process.env`.

// To satisfy TypeScript when using process.env in a browser-targeted project
// without pulling in the full 'node' types. The execution environment is
// expected to provide this object.
declare var process: {
  env: {
    [key: string]: string | undefined;
  };
};

import { translations } from './localization/translations.ts';

export enum Page {
  SPLASH,
  WELCOME_PROFILE,
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
  TALEE,
  GEMATRIA,
}

// Maps Page enums to URL hash paths for routing
export const pageToPath: Record<Page, string> = {
  [Page.SPLASH]: '/splash',
  [Page.WELCOME_PROFILE]: '/welcome',
  [Page.HOME]: '/',
  [Page.TAROT]: '/tarot',
  [Page.HOROSCOPE]: '/horoscope',
  [Page.NUMEROLOGY]: '/numerology',
  [Page.COMPATIBILITY]: '/compatibility',
  [Page.PRIVATE_READING]: '/private-reading',
  [Page.SETTINGS]: '/settings',
  [Page.FALK_LYOM_WELCOME]: '/falk-lyom',
  [Page.FALK_LYOM_GENDER]: '/falk-lyom/gender',
  [Page.FALK_LYOM_SKIN_TONE]: '/falk-lyom/skin-tone',
  [Page.FALK_LYOM_CATEGORY]: '/falk-lyom/category',
  [Page.FALK_LYOM_RESULT]: '/falk-lyom/result',
  [Page.PROFILE]: '/profile',
  [Page.PRIVACY_POLICY]: '/privacy-policy',
  [Page.TERMS_CONDITIONS]: '/terms-conditions',
  [Page.HELP_FAQ]: '/help-faq',
  [Page.TALEE]: '/talee',
  [Page.GEMATRIA]: '/gematria',
};

// Maps URL hash paths back to Page enums
export const pathToPage: { [path: string]: Page } = Object.fromEntries(
  Object.entries(pageToPath).map(([key, value]) => [value, Number(key) as Page])
);


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

export type ReadingType = 'Tarot' | 'Numerology' | 'Compatibility' | 'Horoscope' | 'Falk Lyom' | 'Tale\'e' | 'Gematria';

export interface ReadingHistoryItem {
  id: number; // Using timestamp as a unique ID
  type: ReadingType;
  title: string;
  content: string;
  date: string; // ISO string date
}

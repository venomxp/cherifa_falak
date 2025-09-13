export enum Page {
  SPLASH,
  HOME,
  TAROT,
  HOROSCOPE,
  NUMEROLOGY,
  COMPATIBILITY,
  MORE,
  PRIVATE_READING,
}

export interface ZodiacSign {
  name: string;
  value: string;
  icon: string;
}
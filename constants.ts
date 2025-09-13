import { ZodiacSign } from './types';

// Zodiac signs data including name, value for API calls, and an SVG icon for display
export const ZODIAC_SIGNS: ZodiacSign[] = [
    { name: 'الحمل', value: 'aries', icon: '♈' },
    { name: 'الثور', value: 'taurus', icon: '♉' },
    { name: 'الجوزاء', value: 'gemini', icon: '♊' },
    { name: 'السرطان', value: 'cancer', icon: '♋' },
    { name: 'الأسد', value: 'leo', icon: '♌' },
    { name: 'العذراء', value: 'virgo', icon: '♍' },
    { name: 'الميزان', value: 'libra', icon: '♎' },
    { name: 'العقرب', value: 'scorpio', icon: '♏' },
    { name: 'القوس', value: 'sagittarius', icon: '♐' },
    { name: 'الجدي', value: 'capricorn', icon: '♑' },
    { name: 'الدلو', value: 'aquarius', icon: '♒' },
    { name: 'الحوت', value: 'pisces', icon: '♓' },
];

// List of Tarot cards for the Tarot Reading feature
export const TAROT_CARDS = [
  'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
  'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
  'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
  'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
];

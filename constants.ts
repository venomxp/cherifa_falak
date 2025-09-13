import { ZodiacSign, TarotCardInfo } from './types';

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
export const TAROT_CARDS: TarotCardInfo[] = [
  { english: 'The Fool', arabic: 'الأحمق' },
  { english: 'The Magician', arabic: 'الساحر' },
  { english: 'The High Priestess', arabic: 'الكاهنة العليا' },
  { english: 'The Empress', arabic: 'الإمبراطورة' },
  { english: 'The Emperor', arabic: 'الإمبراطور' },
  { english: 'The Hierophant', arabic: 'الكاهن' },
  { english: 'The Lovers', arabic: 'العشاق' },
  { english: 'The Chariot', arabic: 'العربة' },
  { english: 'Strength', arabic: 'القوة' },
  { english: 'The Hermit', arabic: 'الناسك' },
  { english: 'Wheel of Fortune', arabic: 'عجلة الحظ' },
  { english: 'Justice', arabic: 'العدالة' },
  { english: 'The Hanged Man', arabic: 'الرجل المشنوق' },
  { english: 'Death', arabic: 'الموت' },
  { english: 'Temperance', arabic: 'الاعتدال' },
  { english: 'The Devil', arabic: 'الشيطان' },
  { english: 'The Tower', arabic: 'البرج' },
  { english: 'The Star', arabic: 'النجمة' },
  { english: 'The Moon', arabic: 'القمر' },
  { english: 'The Sun', arabic: 'الشمس' },
  { english: 'Judgement', arabic: 'الحكم' },
  { english: 'The World', arabic: 'العالم' }
];

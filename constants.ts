import { ZodiacSign, TarotCardInfo } from './types';

// Zodiac signs data now uses translation keys for names to support multiple languages
export const ZODIAC_SIGNS: ZodiacSign[] = [
    { value: 'aries', icon: '♈', translationKey: 'aries' },
    { value: 'taurus', icon: '♉', translationKey: 'taurus' },
    { value: 'gemini', icon: '♊', translationKey: 'gemini' },
    { value: 'cancer', icon: '♋', translationKey: 'cancer' },
    { value: 'leo', icon: '♌', translationKey: 'leo' },
    { value: 'virgo', icon: '♍', translationKey: 'virgo' },
    { value: 'libra', icon: '♎', translationKey: 'libra' },
    { value: 'scorpio', icon: '♏', translationKey: 'scorpio' },
    { value: 'sagittarius', icon: '♐', translationKey: 'sagittarius' },
    { value: 'capricorn', icon: '♑', translationKey: 'capricorn' },
    { value: 'aquarius', icon: '♒', translationKey: 'aquarius' },
    { value: 'pisces', icon: '♓', translationKey: 'pisces' },
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
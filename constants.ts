import { ZodiacSign, TarotCardInfo, MoroccanTarotCard } from './types.ts';

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

// New list of Moroccan Tarot cards for Falk Lyom feature
export const MOROCCAN_TAROT_CARDS: MoroccanTarotCard[] = [
  { name: 'الصاحبة البيضة', key: 'sahiba_bayda' },
  { name: 'الحنطية', key: 'hantiya' },
  { name: 'السمرا', key: 'samra' },
  { name: 'الفقيه', key: 'fqih' },
  { name: 'الفلوس', key: 'flouss' },
  { name: 'البحر', key: 'bahr' },
  { name: 'الطريق', key: 'triq' },
  { name: 'الدار', key: 'dar' },
  { name: 'العدو', key: 'adou' },
  { name: 'العتبة', key: 'atba' },
  { name: 'سيد الرجال', key: 'sid_rjal' },
  { name: 'لالة عايشة', key: 'lalla_aicha' },
];


// An aggregated list of all critical images to be preloaded on app start.
export const CRITICAL_IMAGE_URLS: string[] = [
  // Home Page Category Illustrations
  "https://i.postimg.cc/YSzKjGqN/1.png",
  "https://i.postimg.cc/cH1q3xrp/2.png",
  "https://i.postimg.cc/J0gSSjP8/3.png",
  "https://i.postimg.cc/k4T0F0SB/4.png",
  "https://i.postimg.cc/RhqjPg1G/5.png",
  "https://i.postimg.cc/MZFkc8xL/6.png",
  "https://i.postimg.cc/WbFBgf11/7.png",
  "https://i.postimg.cc/wTCSVc1c/8.png",
  // Profile Avatars
  "https://i.postimg.cc/fTSBW09p/1.png",
  "https://i.postimg.cc/W4Tn7WHc/2.png",
  "https://i.postimg.cc/fR45VT7L/3.png",
  "https://i.postimg.cc/g0sKtVCX/4.png",
  "https://i.postimg.cc/mgQjCfVS/5.png",
  "https://i.postimg.cc/ydNyMJKf/6.png",
];
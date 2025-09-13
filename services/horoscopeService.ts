import { translateHoroscopeToArabic } from './geminiService';

const API_BASE_URL = 'https://api.api-ninjas.com/v1/horoscope';

// Fetches the horoscope for a given sign and time period (daily, weekly, monthly)
export const getHoroscope = async (sign: string, period: 'daily' | 'weekly' | 'monthly'): Promise<string> => {
  const url = `${API_BASE_URL}?zodiac=${sign}${period !== 'daily' ? '&day=' + period : ''}`;
  
  // The API seems to only support 'today', 'yesterday', 'tomorrow'. We will use Gemini for weekly/monthly generation.
  // For this implementation, we will fetch daily and use Gemini to expand.
  if (period !== 'daily') {
      return `ميزة الطالع ال${period === 'weekly' ? 'أسبوعي' : 'شهري'} قيد التطوير.`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}?zodiac=${sign}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.GEMINI_API_KEY!,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const englishHoroscope = data.horoscope;
    
    if (!englishHoroscope) {
        return "لم يتم العثور على الطالع لهذا اليوم.";
    }

    const arabicHoroscope = await translateHoroscopeToArabic(englishHoroscope, period);
    return arabicHoroscope;

  } catch (error) {
    console.error("Error fetching horoscope:", error);
    const specificError = error instanceof Error ? error.message : "يرجى التأكد من صلاحية مفتاح الـ API.";
    return `عذراً، حدث خطأ أثناء جلب الطالع. (${specificError})`;
  }
};

// FIX: Use process.env for API key to align with execution environment
import { translateHoroscopeToArabic, getGeneratedHoroscope, translateHoroscopeToFrench } from './geminiService';

const API_BASE_URL = 'https://api.api-ninjas.com/v1/horoscope';

// Fetches the horoscope for a given sign and time period (daily, weekly, monthly)
export const getHoroscope = async (signName: string, signValue: string, period: 'daily' | 'weekly' | 'monthly', language: 'ar' | 'en' | 'fr'): Promise<string> => {
  
  if (period !== 'daily') {
    // For weekly/monthly, we call Gemini directly to generate the horoscope
    return await getGeneratedHoroscope(signName, period, language);
  }

  // Daily horoscope logic remains the same, using Ninja API
  try {
    const response = await fetch(`${API_BASE_URL}?zodiac=${signValue}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.VITE_NINJA_API_KEY!,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const englishHoroscope = data.horoscope;
    
    if (!englishHoroscope) {
        if (language === 'ar') return "لم يتم العثور على الطالع لهذا اليوم.";
        if (language === 'fr') return "Horoscope du jour non trouvé.";
        return "Horoscope for today not found.";
    }

    if (language === 'en') {
        return englishHoroscope;
    }

    if (language === 'fr') {
        return await translateHoroscopeToFrench(englishHoroscope, period);
    }

    const arabicHoroscope = await translateHoroscopeToArabic(englishHoroscope, period);
    return arabicHoroscope;

  } catch (error) {
    console.error("Error fetching horoscope:", error);
    const specificError = error instanceof Error ? error.message : "يرجى التأكد من صلاحية مفتاح الـ API.";
    if (language === 'ar') return `عذراً، حدث خطأ أثناء جلب الطالع. (${specificError})`;
    if (language === 'fr') return `Désolé, une erreur s'est produite lors de la récupération de l'horoscope. (${specificError})`;
    return `Sorry, an error occurred while fetching the horoscope. (${specificError})`;
  }
};
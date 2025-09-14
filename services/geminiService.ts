import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// A robust helper function to call the Gemini API with automatic retries on failure
const generateContentWithRetry = async (prompt: string): Promise<GenerateContentResponse> => {
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } },
      });
      return response;
    } catch (error) {
      console.error("Gemini API call failed, retrying...", error);
      retries--;
      if (retries === 0) {
        throw error;
      }
      await new Promise(res => setTimeout(res, 1000 * (3 - retries))); // Exponential backoff
    }
  }
  throw new Error("Gemini API call failed after multiple retries.");
};

// Translates a given English horoscope text to eloquent Arabic
export const translateHoroscopeToArabic = async (horoscope: string, period: 'daily' | 'weekly' | 'monthly'): Promise<string> => {
  const periodArabic = period === 'daily' ? 'اليومي' : period === 'weekly' ? 'الأسبوعي' : 'الشهري';
  const prompt = `Translate the following ${period} horoscope into eloquent, mystical Arabic. Preserve the astrological tone. Do not add any introductory phrases. Just provide the translated text directly.\n\nHoroscope: "${horoscope}"\n\nArabic Translation:`;
  try {
    const response = await generateContentWithRetry(prompt);
    return response.text.trim();
  } catch (error) {
    console.error("Error translating horoscope:", error);
    return `عذراً، حدث خطأ أثناء ترجمة الطالع ${periodArabic}.`;
  }
};

// Provides a mystical analysis based on a name and date of birth for the Numerology feature
export const getNumerologyReport = async (name: string, dob: string, gematriaValue: number, language: 'ar' | 'en'): Promise<string> => {
  const prompt = language === 'ar'
    ? `Provide a mystical and insightful personality analysis in Arabic based on Numerology and Gematria (حساب الجُمَّل).
Name: "${name}" (Gematria Value: ${gematriaValue})
Date of Birth: ${dob}
Calculate their Life Path Number from the date of birth and combine it with the Gematria analysis of the name to create a complete, insightful, and positive spiritual profile. The tone should be spiritual and encouraging. The response must be in Arabic.`
    : `Provide a mystical and insightful personality analysis in English based on Numerology and Gematria (حساب الجُمَّل).
Name: "${name}" (Gematria Value: ${gematriaValue})
Date of Birth: ${dob}
Calculate their Life Path Number from the date of birth and combine it with the Gematria analysis of the name to create a complete, insightful, and positive spiritual profile. The tone should be spiritual and encouraging. The response must be in English.`;

  try {
    const response = await generateContentWithRetry(prompt);
    return response.text.trim();
  } catch (error) {
    console.error("Error getting numerology report:", error);
    throw new Error("Failed to get numerology report.");
  }
};

// Provides a romantic compatibility analysis based on two names
export const getLoveCompatibilityAnalysis = async (name1: string, name2: string, percentage: number, language: 'ar' | 'en'): Promise<string> => {
    const prompt = language === 'ar'
    ? `Provide a romantic compatibility analysis for two people, ${name1} and ${name2}.
Their calculated compatibility score is ${percentage}%.
Write a warm, insightful, and encouraging analysis in Arabic. Discuss their potential strengths as a couple and areas for growth. The tone should be positive and suitable for a love compatibility reading.`
    : `Provide a romantic compatibility analysis for two people, ${name1} and ${name2}.
Their calculated compatibility score is ${percentage}%.
Write a warm, insightful, and encouraging analysis in English. Discuss their potential strengths as a couple and areas for growth. The tone should be positive and suitable for a love compatibility reading.`;

    try {
        const response = await generateContentWithRetry(prompt);
        return response.text.trim();
    } catch (error) {
        console.error("Error getting love compatibility analysis:", error);
        throw new Error("Failed to get love compatibility analysis.");
    }
};

// Provides a detailed compatibility analysis between two zodiac signs
export const getZodiacCompatibilityAnalysis = async (sign1: string, sign2: string, language: 'ar' | 'en'): Promise<string> => {
    const prompt = language === 'ar'
    ? `Provide a detailed zodiac compatibility analysis in Arabic between ${sign1} and ${sign2}.
Discuss their potential for friendship, love, and partnership. Highlight both the harmonious aspects and potential challenges in their relationship. The tone should be that of an experienced astrologer.`
    : `Provide a detailed zodiac compatibility analysis in English between ${sign1} and ${sign2}.
Discuss their potential for friendship, love, and partnership. Highlight both the harmonious aspects and potential challenges in their relationship. The tone should be that of an experienced astrologer.`;

    try {
        const response = await generateContentWithRetry(prompt);
        return response.text.trim();
    } catch (error) {
        console.error("Error getting zodiac compatibility analysis:", error);
        throw new Error("Failed to get zodiac compatibility analysis.");
    }
};

// Provides an interpretation for a drawn Tarot card using a stream for better UX
export const getTarotInterpretationStream = async (cardName: string, language: 'ar' | 'en') => {
    const prompt = language === 'ar'
    ? `Act as a wise and intuitive tarot reader. Provide a mystical and insightful interpretation in Arabic for the Tarot card: "${cardName}".
Explain its core meaning, its upright significance, and what message it might hold for someone who has drawn it today. The tone should be supportive and empowering.`
    : `Act as a wise and intuitive tarot reader. Provide a mystical and insightful interpretation in English for the Tarot card: "${cardName}".
Explain its core meaning, its upright significance, and what message it might hold for someone who has drawn it today. The tone should be supportive and empowering.`;
    try {
        const response = await ai.models.generateContentStream({
           model: "gemini-2.5-flash",
           contents: prompt,
           config: { thinkingConfig: { thinkingBudget: 0 } },
        });
        return response;
    } catch (error) {
        console.error("Error getting tarot interpretation stream:", error);
        throw new Error("Failed to get tarot interpretation stream.");
    }
};
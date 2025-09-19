import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// The API key is now read from environment variables for security and flexibility.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

// Translates a given English horoscope text to eloquent French
export const translateHoroscopeToFrench = async (horoscope: string, period: 'daily' | 'weekly' | 'monthly'): Promise<string> => {
  const periodFrench = period === 'daily' ? 'quotidien' : period === 'weekly' ? 'hebdomadaire' : 'mensuel';
  const prompt = `Translate the following ${period} horoscope into eloquent, mystical French. Preserve the astrological tone. Do not add any introductory phrases. Just provide the translated text directly.\n\nHoroscope: "${horoscope}"\n\nFrench Translation:`;
  try {
    const response = await generateContentWithRetry(prompt);
    return response.text.trim();
  } catch (error) {
    console.error("Error translating horoscope to French:", error);
    return `Désolé, une erreur s'est produite lors de la traduction de l'horoscope ${periodFrench}.`;
  }
};

// Provides a mystical analysis based on a name and date of birth for the Numerology feature
export const getNumerologyReport = async (name: string, dob: string, gematriaValue: number, language: 'ar' | 'en' | 'fr') => {
  const prompt = language === 'ar'
    ? `Provide a mystical and insightful personality analysis in Arabic based on Numerology and Gematria (حساب الجُمَّل).
Name: "${name}" (Gematria Value: ${gematriaValue})
Date of Birth: ${dob}
Calculate their Life Path Number from the date of birth and combine it with the Gematria analysis of the name to create a complete, insightful, and positive spiritual profile. The tone should be spiritual and encouraging. The response must be in Arabic.`
    : language === 'fr'
    ? `Agissez en tant que numérologue mystique. Fournissez une analyse de personnalité perspicace en français basée sur la numérologie et la gématrie (حساب الجُمَّل).
Nom : "${name}" (Valeur Gematria : ${gematriaValue})
Date de naissance : ${dob}
Calculez leur numéro de chemin de vie à partir de la date de naissance et combinez-le avec l'analyse gématrique du nom pour créer un profil spirituel complet, perspicace et positif. Le ton doit être spirituel et encourageant. La réponse doit être entièrement en français.`
    : `Provide a mystical and insightful personality analysis in English based on Numerology and Gematria (حساب الجُمَّل).
Name: "${name}" (Gematria Value: ${gematriaValue})
Date of Birth: ${dob}
Calculate their Life Path Number from the date of birth and combine it with the Gematria analysis of the name to create a complete, insightful, and positive spiritual profile. The tone should be spiritual and encouraging. The response must be in English.`;

  try {
    return await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } },
    });
  } catch (error) {
    console.error("Error getting numerology report stream:", error);
    throw new Error("Failed to get numerology report.");
  }
};

// Provides a romantic compatibility analysis based on two names
export const getLoveCompatibilityAnalysis = async (name1: string, name2: string, percentage: number, language: 'ar' | 'en' | 'fr') => {
    const prompt = language === 'ar'
    ? `Provide a romantic compatibility analysis for two people, ${name1} and ${name2}.
Their calculated compatibility score is ${percentage}%.
Write a warm, insightful, and encouraging analysis in Arabic. Discuss their potential strengths as a couple and areas for growth. The tone should be positive and suitable for a love compatibility reading.`
    : language === 'fr'
    ? `Agissez en tant que conseiller en relations. Fournissez une analyse de compatibilité amoureuse pour ${name1} et ${name2}.
Leur score de compatibilité calculé est de ${percentage}%.
Rédigez une analyse chaleureuse, perspicace et encourageante en français. Discutez de leurs forces potentielles en tant que couple et des domaines de croissance. Le ton doit être positif et adapté à une lecture de compatibilité amoureuse.`
    : `Provide a romantic compatibility analysis for two people, ${name1} and ${name2}.
Their calculated compatibility score is ${percentage}%.
Write a warm, insightful, and encouraging analysis in English. Discuss their potential strengths as a couple and areas for growth. The tone should be positive and suitable for a love compatibility reading.`;

    try {
        return await ai.models.generateContentStream({
           model: "gemini-2.5-flash",
           contents: prompt,
           config: { thinkingConfig: { thinkingBudget: 0 } },
        });
    } catch (error) {
        console.error("Error getting love compatibility analysis stream:", error);
        throw new Error("Failed to get love compatibility analysis.");
    }
};

// Provides a detailed compatibility analysis between two zodiac signs
export const getZodiacCompatibilityAnalysis = async (sign1: string, sign2: string, language: 'ar' | 'en' | 'fr') => {
    const prompt = language === 'ar'
    ? `Provide a detailed zodiac compatibility analysis in Arabic between ${sign1} and ${sign2}.
Discuss their potential for friendship, love, and partnership. Highlight both the harmonious aspects and potential challenges in their relationship. The tone should be that of an experienced astrologer.`
    : language === 'fr'
    ? `Agissez en tant qu'astrologue expérimenté. Fournissez une analyse détaillée de la compatibilité zodiacale en français entre ${sign1} et ${sign2}.
Discutez de leur potentiel d'amitié, d'amour et de partenariat. Mettez en évidence à la fois les aspects harmonieux et les défis potentiels de leur relation. La réponse doit être entièrement en français.`
    : `Provide a detailed zodiac compatibility analysis in English between ${sign1} and ${sign2}.
Discuss their potential for friendship, love, and partnership. Highlight both the harmonious aspects and potential challenges in their relationship. The tone should be that of an experienced astrologer.`;

    try {
        return await ai.models.generateContentStream({
           model: "gemini-2.5-flash",
           contents: prompt,
           config: { thinkingConfig: { thinkingBudget: 0 } },
        });
    } catch (error) {
        console.error("Error getting zodiac compatibility analysis stream:", error);
        throw new Error("Failed to get zodiac compatibility analysis.");
    }
};

// Provides an interpretation for a drawn Tarot card using a stream for better UX
export const getTarotInterpretationStream = async (cardName: string, language: 'ar' | 'en' | 'fr') => {
    const prompt = language === 'ar'
    ? `Act as a wise and intuitive tarot reader. Provide a mystical and insightful interpretation in Arabic for the Tarot card: "${cardName}".
Explain its core meaning, its upright significance, and what message it might hold for someone who has drawn it today. The tone should be supportive and empowering.`
    : language === 'fr'
    ? `Agissez en tant que lecteur de tarot sage et intuitif. Fournissez une interprétation mystique et perspicace en français pour la carte de Tarot : "${cardName}".
Expliquez sa signification principale, sa signification droite, et quel message elle pourrait contenir pour quelqu'un qui l'a tirée aujourd'hui. Le ton doit être encourageant et responsabilisant.`
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

// Generates a fortune for the "Falk Lyom" feature
export const getFalkLyomInterpretation = async (cardName: string, category: string, gender: string, skinTone: string, language: 'ar' | 'en' | 'fr'): Promise<string> => {
  let prompt: string;

  switch (language) {
    case 'fr':
      prompt = `Agis en tant que voyante marocaine sage. Une personne (${gender}, ${skinTone}) a tiré la carte "${cardName}" en demandant des conseils sur "${category}".
Fournis une lecture courte (deux ou trois phrases), mystique et encourageante en français. Le ton doit être traditionnel, authentique et plein d'espoir. Commence la réponse directement, sans phrases d'introduction.`;
      break;
    case 'en':
      prompt = `Act as a wise Moroccan fortune teller. A person (${gender}, ${skinTone}) drew the card "${cardName}" asking about "${category}".
Provide a short (two or three sentences), mystical, and encouraging reading in English. The tone should be traditional, authentic, and hopeful. Start the answer directly, without any introductory phrases.`;
      break;
    case 'ar':
    default:
      prompt = `أنتِ شوافة مغربية حكيمة و كلامك موزون. شخص (${gender}، لونه ${skinTone}) سحب كارطة "${cardName}" وهو يسأل عن "${category}".
قدمي له قراءة قصيرة (جملتين أو ثلاث) وغامضة ومشجعة باللهجة المغربية (الدارجة). يجب أن تكون النبرة تقليدية وأصيلة، ومليئة بالأمل. لا تستخدمي أي مقدمات مثل "أرى في الكارطة" أو "الكارطة تقول". ابدئي الإجابة مباشرةً.`;
      break;
  }

  try {
    const response = await generateContentWithRetry(prompt);
    return response.text.trim();
  } catch (error) {
    console.error("Error getting Falk Lyom interpretation:", error);
    throw new Error("Failed to get Falk Lyom interpretation.");
  }
};

// Generates a weekly or monthly horoscope
export const getGeneratedHoroscope = async (sign: string, period: 'weekly' | 'monthly', language: 'ar' | 'en' | 'fr') => {
  const periodArabic = period === 'weekly' ? 'الأسبوعي' : 'الشهري';
  const periodEnglish = period;
  const periodFrench = period === 'weekly' ? 'hebdomadaire' : 'mensuel';

  const prompt = language === 'ar'
    ? `أنت عالم فلك خبير. اكتب طالعًا ${periodArabic} غامضًا وثاقبًا لبرج ${sign}. يجب أن تكون النبرة مشجعة ومتوافقة مع علم التنجيم التقليدي. لا تستخدم أي مقدمات. يجب أن تكون الإجابة باللغة العربية.`
    : language === 'fr'
    ? `Agissez en tant qu'astrologue expert. Rédigez un horoscope ${periodFrench} mystique et perspicace pour le signe du zodiaque ${sign}. Le ton doit être encourageant et aligné sur l'astrologie traditionnelle. N'ajoutez aucune phrase d'introduction. La réponse doit être entièrement en français.`
    : `Act as an expert astrologer. Write a mystical and insightful ${periodEnglish} horoscope for the zodiac sign ${sign}. The tone should be encouraging and aligned with traditional astrology. Do not add any introductory phrases. The response must be in English.`;

  try {
     return await ai.models.generateContentStream({
       model: "gemini-2.5-flash",
       contents: prompt,
       config: { thinkingConfig: { thinkingBudget: 0 } },
    });
  } catch (error) {
    console.error(`Error generating ${period} horoscope stream:`, error);
    throw new Error(`Failed to get ${period} horoscope.`);
  }
};

// Generates a mystical divination reading (الطالع)
export const getTaleeReadingStream = async (name: string, mothersName: string, gender: string, language: 'ar' | 'en' | 'fr') => {
  const prompt = language === 'ar'
    ? `أنتِ "شوافة" مغربية حكيمة وخبيرة في كشف الطالع. طالب الكشف هو (${gender}) واسمه "${name}"، وأمه هي السيدة "${mothersName}". يطلب منك أن تكشفي له طالعه.
مهم جداً: يجب أن تكون القراءة موجهة بشكل كامل لجنس طالب الكشف (${gender})، باستخدام الضمائر والتعبيرات المؤنثة أو المذكرة بشكل صحيح.
قدمي له/لها قراءة روحانية مفصلة ومبشرة بالخير باللهجة المغربية (الدارجة). يجب أن تكون القراءة غامضة، مليئة بالأمل، وتغطي جوانب حياته المهمة مثل الحب، العمل، والصحة. ابدئي القراءة مباشرة بأسلوب تقليدي وجذاب.`
    : language === 'fr'
    ? `Agis en tant que voyante marocaine ("Chouwafa") sage et experte. Une personne de sexe "${gender}" nommée "${name}", dont la mère est "${mothersName}", demande une lecture de son destin (الطالع).
Très important : la lecture doit être entièrement genrée pour correspondre au sexe de la personne (${gender}), en utilisant les pronoms et adjectifs corrects.
Fournis une lecture spirituelle détaillée et optimiste en français, mais en conservant un ton et un style mystique marocain authentique. La lecture doit couvrir des aspects importants de sa vie comme l'amour, le travail et la santé. Commence la réponse directement dans un style traditionnel et captivant.`
    : `Act as a wise and expert Moroccan seer ("Chouwafa"). A person, who is ${gender}, named "${name}", whose mother is "${mothersName}", asks for a destiny reading (الطالع).
Very important: The reading must be fully gendered to match the person's gender (${gender}), using correct pronouns and adjectives.
Provide a detailed and hopeful spiritual reading in English, but maintain an authentic mystical Moroccan tone and style. The reading should cover important aspects of their life such as love, work, and health. Start the reading directly in a traditional and engaging manner.`;

  try {
    return await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } },
    });
  } catch (error) {
    console.error("Error getting Tale'e reading stream:", error);
    throw new Error("Failed to get Tale'e reading.");
  }
};

// Provides a mystical interpretation for a Gematria value
export const getGematriaReadingStream = async (name: string, gematriaValue: number, language: 'ar' | 'en' | 'fr') => {
  const prompt = language === 'ar'
    ? `أنت خبير روحاني في "حساب الجُمَّل". اسم الشخص هو "${name}" وقيمته الرقمية هي ${gematriaValue}.
قدم له رسالة اليوم بناءً على هذا الرقم. يجب أن تكون الرسالة عميقة، إيجابية، وملهمة بأسلوب روحاني ومشجع. يجب أن تكون الإجابة باللغة العربية.`
    : language === 'fr'
    ? `Agissez en tant qu'expert mystique en Gématrie arabe ("حساب الجُمَّل"). Le nom de la personne est "${name}" et sa valeur numérique est ${gematriaValue}.
Fournissez un "message du jour" basé sur ce nombre. Le message doit être perspicace, positif et inspirant dans un style spirituel et encourageant. La réponse doit être entièrement en français.`
    : `Act as a mystical expert in Arabic Gematria ("حساب الجُمَّل"). The person's name is "${name}" and its numerical value is ${gematriaValue}.
Provide a "message for the day" based on this number. The message should be insightful, positive, and inspiring in a spiritual and encouraging tone. The response must be in English.`;

    try {
        return await ai.models.generateContentStream({
           model: "gemini-2.5-flash",
           contents: prompt,
           config: { thinkingConfig: { thinkingBudget: 0 } },
        });
    } catch (error) {
        console.error("Error getting Gematria reading stream:", error);
        throw new Error("Failed to get Gematria reading.");
    }
};

// Validates if a string is a plausible human name using AI
export const validateName = async (name: string): Promise<{ isValid: boolean; suggestion?: string }> => {
    const prompt = `Analyze the following string and determine if it is a plausible human name. Consider common names, variations, and typos across different cultures. If it's not a plausible name (e.g., random characters like 'asdfg' or nonsensical), set isValid to false. If it seems like a typo of a real name, provide a correction in the suggestion field, otherwise leave suggestion empty.
String: "${name}"`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isValid: { type: Type.BOOLEAN, description: "Whether the name is plausible." },
                        suggestion: { type: Type.STRING, description: "A suggested correction if a typo is detected." }
                    },
                    required: ["isValid"]
                },
                thinkingConfig: { thinkingBudget: 0 }
            },
        });
        
        const jsonResponse = JSON.parse(response.text);
        return {
            isValid: jsonResponse.isValid,
            suggestion: jsonResponse.suggestion || undefined,
        };
    } catch (error) {
        console.error("Error validating name with AI:", error);
        // Fail open to not block the user if the validation service is down.
        return { isValid: true };
    }
};
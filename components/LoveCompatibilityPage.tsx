import React, { useState } from 'react';
import { Page } from '../types.ts';
import { getLoveCompatibilityAnalysis } from '../services/geminiService.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import Spinner from './common/Spinner.tsx';
import TarotCard from './common/TarotCard.tsx';

interface LoveCompatibilityPageProps {
  setPage: (page: Page) => void;
}

const LoveCompatibilityPage: React.FC<LoveCompatibilityPageProps> = ({ setPage }) => {
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [percentage, setPercentage] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const calculateCompatibility = (n1: string, n2: string): number => {
    const combined = [n1.trim(), n2.trim()].sort().join('-');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    // Generate a "believable" percentage between 50% and 100%
    const result = 50 + (Math.abs(hash) % 51);
    return result;
  };

  const handleAnalyze = async () => {
    if (!name1.trim() || !name2.trim()) {
      setError('الرجاء إدخال الاسمين.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');
    
    const compatibilityPercentage = calculateCompatibility(name1, name2);
    setPercentage(compatibilityPercentage);

    try {
      // FIX: Added 'ar' for the missing language parameter.
      const stream = await getLoveCompatibilityAnalysis(name1, name2, compatibilityPercentage, 'ar');
      // FIX: The API returns a stream. Iterate over it to get the full text.
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk.text;
      }
      setAnalysis(fullText);
    } catch (err) {
      setError('حدث خطأ أثناء تحليل التوافق. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in">
      <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        قياس توافق الحب
      </h2>

      <Card className="w-full max-w-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="name1" className="block text-lg font-semibold mb-2 text-purple-300">
                الاسم الأول
                </label>
                <input
                id="name1"
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="ادخل الاسم الأول"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                dir="rtl"
                />
            </div>
            <div>
                <label htmlFor="name2" className="block text-lg font-semibold mb-2 text-purple-300">
                الاسم الثاني
                </label>
                <input
                id="name2"
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="ادخل الاسم الثاني"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                dir="rtl"
                />
            </div>
        </div>
      </Card>

      <Button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? 'جاري التحليل...' : 'اكتشف نسبة التوافق'}
      </Button>

      {isLoading && <Spinner />}
      
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {analysis && !isLoading && percentage !== null && (
        <div className="mt-8 w-full max-w-2xl">
          <TarotCard>
            <div className="p-4 text-center">
                 <h3 className="text-2xl font-bold text-yellow-300 mb-2">{`تحليل العلاقة بين ${name1} و ${name2}`}</h3>
                <div className="text-center mb-4">
                    <p className="text-2xl font-bold">نسبة التوافق</p>
                    <p className="text-6xl font-black text-pink-400 my-2">{percentage}%</p>
                </div>
                <p className="text-lg whitespace-pre-wrap leading-relaxed text-gray-200">{analysis}</p>
            </div>
          </TarotCard>
        </div>
      )}

      <Button onClick={() => setPage(Page.HOME)} className="mt-12 bg-opacity-50 border border-purple-400 hover:bg-purple-700">
        العودة إلى الرئيسية
      </Button>
    </div>
  );
};

export default LoveCompatibilityPage;
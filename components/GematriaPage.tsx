import React, { useState } from 'react';
import { Page } from '../types';
// FIX: Changed import from non-existent `getGematriaInterpretation` to `getNumerologyReport`.
import { getNumerologyReport } from '../services/geminiService';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';
import TarotCard from './common/TarotCard';

interface GematriaPageProps {
  setPage: (page: Page) => void;
}

const GematriaPage: React.FC<GematriaPageProps> = ({ setPage }) => {
  const [name, setName] = useState<string>('');
  const [gematriaValue, setGematriaValue] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const abjadMap: { [key: string]: number } = {
    'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1,
    'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ة': 5,
    'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 10, 'ى': 10,
    'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60,
    'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200,
    'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700,
    'ض': 800, 'ظ': 900, 'غ': 1000
  };

  const calculateGematria = (inputName: string): number => {
    let sum = 0;
    for (const char of inputName) {
      if (abjadMap[char]) {
        sum += abjadMap[char];
      }
    }
    return sum;
  };

  const handleCalculate = async () => {
    if (!name.trim()) {
      setError('الرجاء إدخال اسم.');
      return;
    }
    setIsLoading(true);
    setError('');
    setInterpretation('');
    
    const value = calculateGematria(name);
    setGematriaValue(value);

    try {
      // FIX: Replaced non-existent `getGematriaInterpretation` with `getNumerologyReport`.
      // Passing an empty string for `dob` as this component does not collect it.
      // FIX: Added 'ar' for the missing language parameter.
      const result = await getNumerologyReport(name, '', value, 'ar');
      setInterpretation(result);
    } catch (err) {
      setError('حدث خطأ أثناء جلب التحليل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in">
      <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        حساب الجُمّل (الأبجدي)
      </h2>

      <Card className="w-full max-w-md mb-8">
        <label htmlFor="name" className="block text-lg font-semibold mb-2 text-purple-300">
          أدخل اسمك باللغة العربية
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثال: محمد"
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          dir="rtl"
        />
      </Card>

      <Button onClick={handleCalculate} disabled={isLoading}>
        {isLoading ? 'جاري الحساب...' : 'احسب واكتشف السر'}
      </Button>

      {isLoading && <Spinner />}
      
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {interpretation && !isLoading && (
        <div className="mt-8 w-full max-w-2xl">
          <TarotCard>
             <div className="p-4 text-center">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">{`تحليل اسم "${name}"`}</h3>
                <p className="text-xl text-center mb-4 font-bold">
                    مجموع حساب الجُمّل: <span className="text-yellow-400">{gematriaValue}</span>
                </p>
                <p className="text-lg whitespace-pre-wrap leading-relaxed text-gray-200">{interpretation}</p>
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

export default GematriaPage;

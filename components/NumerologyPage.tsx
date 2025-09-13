import React, { useState } from 'react';
import { Page } from '../types';
import { getNumerologyReport } from '../services/geminiService';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';

interface NumerologyPageProps {
  setPage: (page: Page) => void;
}

const NumerologyPage: React.FC<NumerologyPageProps> = ({ setPage }) => {
  const [name, setName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const abjadMap: { [key: string]: number } = {
    'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ة': 5,
    'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 10, 'ى': 10, 'ك': 20, 'ل': 30, 'م': 40, 
    'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 
    'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
  };

  const calculateGematria = (inputName: string): number => {
    return inputName.split('').reduce((sum, char) => sum + (abjadMap[char] || 0), 0);
  };

  const handleAnalyze = async () => {
    if (!name.trim() || !dob) {
      setError('الرجاء إدخال الاسم وتاريخ الميلاد.');
      return;
    }
    setIsLoading(true);
    setError('');
    setReport('');

    try {
      const gematriaValue = calculateGematria(name);
      const result = await getNumerologyReport(name, dob, gematriaValue);
      setReport(result);
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء التقرير. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in">
      <h2 className="text-4xl font-bold my-8 text-center text-amber-300">
        علم الأعداد
      </h2>

      {!report && (
        <Card className="w-full max-w-md mb-8">
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-lg font-semibold mb-2 text-amber-200">
                    أدخل اسمك
                    </label>
                    <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="الاسم الأول"
                    className="w-full p-3 bg-[#221E1F]/50 text-white border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    dir="rtl"
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="block text-lg font-semibold mb-2 text-amber-200">
                    أدخل تاريخ ميلادك
                    </label>
                    <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-3 bg-[#221E1F]/50 text-white border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>
            </div>
             <Button onClick={handleAnalyze} disabled={isLoading} className="w-full mt-6">
                {isLoading ? 'جاري التحليل...' : 'اكشف أسرار أرقامك'}
            </Button>
        </Card>
      )}

      {isLoading && <Spinner />}
      
      {error && !isLoading && <p className="text-red-400 mt-4 text-center">{error}</p>}

      {report && !isLoading && (
        <div className="mt-8 w-full max-w-2xl animate-fade-in">
          <Card>
             <div className="p-4">
                <h3 className="text-2xl font-bold text-amber-300 mb-4 text-center">تقريرك في علم الأعداد</h3>
                <p className="text-lg whitespace-pre-wrap leading-relaxed">{report}</p>
                <div className="text-center">
                    <Button onClick={() => setReport('')} className="mt-6">تحليل جديد</Button>
                </div>
             </div>
          </Card>
        </div>
      )}

      <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
        العودة إلى الرئيسية
      </Button>
    </div>
  );
};

export default NumerologyPage;

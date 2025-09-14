import React, { useState } from 'react';
import { Page, ZodiacSign } from '../types';
import { ZODIAC_SIGNS } from '../constants';
import { getZodiacCompatibilityAnalysis, getLoveCompatibilityAnalysis } from '../services/geminiService';
import Button from './common/Button';
import Spinner from './common/Spinner';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

interface CompatibilityPageProps {
  setPage: (page: Page) => void;
}

type Mode = 'zodiac' | 'names';

const CompatibilityPage: React.FC<CompatibilityPageProps> = ({ setPage }) => {
  const { language, t } = useSettings();
  const [mode, setMode] = useState<Mode>('zodiac');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // State for Zodiac mode
  const [sign1, setSign1] = useState<ZodiacSign | null>(null);
  const [sign2, setSign2] = useState<ZodiacSign | null>(null);

  // State for Names mode
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [percentage, setPercentage] = useState<number | null>(null);

  const calculateNameCompatibility = (n1: string, n2: string): number => {
    const combined = [n1.trim(), n2.trim()].sort().join('-');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = ((hash << 5) - hash) + combined.charCodeAt(i);
        hash |= 0;
    }
    return 60 + (Math.abs(hash) % 41); // Believable percentage between 60% and 100%
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');
    setPercentage(null);

    try {
      let result = '';
      if (mode === 'zodiac') {
        if (!sign1 || !sign2) {
          setError(t('errorSelectTwoSigns'));
          setIsLoading(false);
          return;
        }
        result = await getZodiacCompatibilityAnalysis(t(sign1.translationKey), t(sign2.translationKey), language);
      } else {
        if (!name1.trim() || !name2.trim()) {
          setError(t('errorEnterBothNames'));
          setIsLoading(false);
          return;
        }
        const compatPercentage = calculateNameCompatibility(name1, name2);
        setPercentage(compatPercentage);
        result = await getLoveCompatibilityAnalysis(name1, name2, compatPercentage, language);
      }
      setAnalysis(result);
    } catch (err) {
      setError(t('errorCompatibility'));
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
      setAnalysis('');
      setError('');
      setSign1(null);
      setSign2(null);
      setName1('');
      setName2('');
      setPercentage(null);
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in">
      <h2 className="text-4xl font-bold my-8 text-center text-amber-800 dark:text-amber-300">
        {t('compatibilityPageTitle')}
      </h2>

      {!analysis && (
         <Card className="w-full max-w-lg mb-8">
            <div className="flex justify-center border border-amber-500/30 rounded-full p-1 mb-6 bg-black/10 dark:bg-black/20">
              <button onClick={() => setMode('zodiac')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors ${mode === 'zodiac' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-700 dark:text-amber-200'}`}>{t('byZodiac')}</button>
              <button onClick={() => setMode('names')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors ${mode === 'names' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-700 dark:text-amber-200'}`}>{t('byNames')}</button>
            </div>
            
            {mode === 'zodiac' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select onChange={(e) => setSign1(ZODIAC_SIGNS.find(s => s.value === e.target.value) || null)} className="w-full p-3 bg-white/50 dark:bg-[#221E1F]/50 text-slate-800 dark:text-white border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" defaultValue="">
                        <option value="" disabled>{t('selectFirstSign')}</option>
                        {ZODIAC_SIGNS.map(s => <option key={s.value} value={s.value}>{t(s.translationKey)}</option>)}
                    </select>
                    <select onChange={(e) => setSign2(ZODIAC_SIGNS.find(s => s.value === e.target.value) || null)} className="w-full p-3 bg-white/50 dark:bg-[#221E1F]/50 text-slate-800 dark:text-white border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" defaultValue="">
                        <option value="" disabled>{t('selectSecondSign')}</option>
                        {ZODIAC_SIGNS.map(s => <option key={s.value} value={s.value}>{t(s.translationKey)}</option>)}
                    </select>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={name1} onChange={(e) => setName1(e.target.value)} placeholder={t('firstName')} className="w-full p-3 bg-white/50 dark:bg-[#221E1F]/50 text-slate-800 dark:text-white border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" dir={language === 'ar' ? 'rtl' : 'ltr'} />
                    <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} placeholder={t('secondName')} className="w-full p-3 bg-white/50 dark:bg-[#221E1F]/50 text-slate-800 dark:text-white border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" dir={language === 'ar' ? 'rtl' : 'ltr'} />
                </div>
            )}
            <Button onClick={handleAnalyze} disabled={isLoading} className="w-full mt-6">
                {isLoading ? t('analyzing') : t('analyzeCompatibility')}
            </Button>
        </Card>
      )}

      {isLoading && <Spinner />}
      {error && !isLoading && <p className="text-red-400 mt-4 text-center">{error}</p>}

      {analysis && !isLoading && (
        <Card className="w-full max-w-2xl animate-fade-in">
          {mode === 'names' && percentage && (
              <div className="text-center mb-4">
                  <p className="text-xl font-bold text-amber-700 dark:text-amber-200">{t('compatibilityResultTitleNames', { name1, name2 })}</p>
                  <p className="text-6xl font-black text-amber-600 dark:text-amber-300 my-2 animate-pulse">{percentage}%</p>
              </div>
          )}
           {mode === 'zodiac' && sign1 && sign2 && (
              <h3 className="text-2xl font-bold text-center text-amber-800 dark:text-amber-300 mb-4">{t('compatibilityResultTitleZodiac', { sign1: t(sign1.translationKey), sign2: t(sign2.translationKey) })}</h3>
          )}
          <p className={`text-lg whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-[#F5EFE6] ${language === 'ar' ? 'text-right' : 'text-left'}`}>{analysis}</p>
          <div className="text-center mt-6">
            <Button onClick={reset}>{t('newAnalysis')}</Button>
          </div>
        </Card>
      )}

      <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
        {t('goHome')}
      </Button>
    </div>
  );
};

export default CompatibilityPage;
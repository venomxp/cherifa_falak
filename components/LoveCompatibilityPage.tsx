import React, { useState } from 'react';
import { Page } from '../types.ts';
import { getLoveCompatibilityAnalysis } from '../services/geminiService.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import Spinner from './common/Spinner.tsx';
import TarotCard from './common/TarotCard.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface LoveCompatibilityPageProps {
  setPage: (page: Page) => void;
}

const LoveCompatibilityPage: React.FC<LoveCompatibilityPageProps> = ({ setPage }) => {
  // FIX: Use settings for i18n and dynamic language.
  const { t, language } = useSettings();
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
      // FIX: Use translation key for error message.
      setError(t('errorEnterBothNames'));
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');
    
    const compatibilityPercentage = calculateCompatibility(name1, name2);
    setPercentage(compatibilityPercentage);

    try {
      // FIX: Use dynamic language from settings instead of hardcoded 'ar'.
      const stream = await getLoveCompatibilityAnalysis(name1, name2, compatibilityPercentage, language);
      // The API returns a stream. Iterate over it to get the full text.
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk.text;
      }
      setAnalysis(fullText);
    } catch (err) {
      // FIX: Use translation key for error message.
      setError(t('errorCompatibility'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-grow animate-fade-in box-border pb-24">
      {/* FIX: Use consistent page title styling and translation. */}
      <h2 className="text-4xl font-logo-en font-bold my-8 text-center text-brand-accent tracking-wider">
        {t('compatibility')}
      </h2>

      <Card className="w-full max-w-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                {/* FIX: Use translation key for label. */}
                <label htmlFor="name1" className="block text-lg font-semibold mb-2 text-brand-accent">
                {t('yourName')}
                </label>
                <input
                id="name1"
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                // FIX: Use translation key for placeholder.
                placeholder={t('yourName')}
                // FIX: Use consistent input styling and dynamic text direction.
                className="w-full p-3 bg-brand-light dark:bg-brand-dark text-brand-light-text dark:text-brand-text-light border border-brand-light-border dark:border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
            </div>
            <div>
                {/* FIX: Use translation key for label. */}
                <label htmlFor="name2" className="block text-lg font-semibold mb-2 text-brand-accent">
                {t('secondName')}
                </label>
                <input
                id="name2"
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                // FIX: Use translation key for placeholder.
                placeholder={t('secondName')}
                // FIX: Use consistent input styling and dynamic text direction.
                className="w-full p-3 bg-brand-light dark:bg-brand-dark text-brand-light-text dark:text-brand-text-light border border-brand-light-border dark:border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
            </div>
        </div>
      </Card>

      {/* FIX: Use translation keys and consistent button component usage. */}
      <Button onClick={handleAnalyze} disabled={isLoading} variant="primary">
        {isLoading ? t('analyzing') : t('analyzeCompatibility')}
      </Button>

      {isLoading && <Spinner />}
      
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {analysis && !isLoading && percentage !== null && (
        <div className="mt-8 w-full max-w-2xl animate-fade-in">
          <Card>
            <div className="p-4 text-center">
                 {/* FIX: Use translation key for title. */}
                 <h3 className="text-2xl font-bold text-brand-accent mb-2">{t('compatibilityResultTitleNames', { name1, name2 })}</h3>
                <div className="text-center mb-4">
                    {/* FIX: Use translation key for label. */}
                    <p className="text-2xl font-bold">{t('compatibility')}</p>
                    <p className="text-6xl font-black text-brand-accent my-2">{percentage}%</p>
                </div>
                {/* FIX: Use consistent text colors. */}
                <p className={`text-lg whitespace-pre-wrap leading-relaxed text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>{analysis}</p>
            </div>
          </Card>
        </div>
      )}

      {/* FIX: Use consistent button component usage. */}
      <div className="mt-8">
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">
          {t('goHome')}
        </Button>
      </div>
    </div>
  );
};

export default LoveCompatibilityPage;
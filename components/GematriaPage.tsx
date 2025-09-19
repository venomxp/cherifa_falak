import React, { useState, useEffect } from 'react';
import { Page } from '../types.ts';
import { getGematriaReadingStream, validateName } from '../services/geminiService.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import Spinner from './common/Spinner.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface GematriaPageProps {
  page: Page;
  setPage: (page: Page) => void;
}

const GematriaPage: React.FC<GematriaPageProps> = ({ page, setPage }) => {
  const { language, t, userName, addReadingToHistory, readingHistory } = useSettings();
  const [name, setName] = useState('');
  const [gematriaValue, setGematriaValue] = useState<number | null>(null);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

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
    return inputName.split('').reduce((sum, char) => sum + (abjadMap[char] || 0), 0);
  };

  const handleCalculate = async () => {
    if (!name.trim()) {
      setError(t('errorEnterName'));
      setGematriaValue(null);
      return;
    }
    setError('');
    setReading('');
    setIsValidating(true);
    
    const validationResult = await validateName(name);
    if (!validationResult.isValid) {
      setError(validationResult.suggestion 
        ? t('errorInvalidNameWithSuggestion', { suggestion: validationResult.suggestion })
        : t('errorInvalidName')
      );
      setIsValidating(false);
      return;
    }
    
    setIsValidating(false);
    const value = calculateGematria(name);
    setGematriaValue(value);
  };
  
  const handleGetReading = async () => {
    if (gematriaValue === null) return;

    setIsLoading(true);
    setReading('');
    setError('');

    // 1. Check history for a reading from today
    const todayStr = new Date().toISOString().split('T')[0];
    const expectedTitle = t('gematriaReadingHistoryTitle', { name });

    const todaysReading = readingHistory.find(item => 
        item.type === 'Gematria' &&
        item.title === expectedTitle &&
        item.date.startsWith(todayStr)
    );

    if (todaysReading) {
        const contentParts = todaysReading.content.split('\n\n');
        const mainReading = contentParts.length > 1 ? contentParts.slice(1).join('\n\n') : contentParts[0];
        
        // Use timeout for smoother UX, showing the cached result
        setTimeout(() => {
            setReading(mainReading);
            setIsLoading(false);
        }, 500);
        return;
    }

    // 2. If not in history, fetch from API
    let fullReading = '';
    try {
      const stream = await getGematriaReadingStream(name, gematriaValue, language);
      setIsLoading(false);
      setIsStreaming(true);
      for await (const chunk of stream) {
        fullReading += chunk.text;
        setReading(prev => prev + chunk.text);
      }
    } catch (err) {
      setError(t('errorGenerateReport'));
      setIsLoading(false);
    } finally {
      setIsStreaming(false);
      if (fullReading) {
        const title = t('gematriaReadingHistoryTitle', { name });
        addReadingToHistory({ type: 'Gematria', title, content: `**${t('yourGematriaValueIs')} ${gematriaValue}**\n\n${fullReading}` });
      }
    }
  };

  const reset = () => {
    setName(userName || '');
    setGematriaValue(null);
    setReading('');
    setError('');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-grow animate-fade-in box-border pb-24">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-4xl font-logo-en font-bold my-8 text-center text-brand-accent tracking-wider">
          {t('gematriaPageTitle')}
        </h2>

        <Card className="w-full max-w-md mb-6">
          <label htmlFor="name" className="block text-lg font-semibold mb-2 text-brand-accent">
            {t('enterYourNameGematria')}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('yourName')}
            className="w-full p-3 bg-brand-light dark:bg-brand-dark text-brand-light-text dark:text-brand-text-light border border-brand-light-border dark:border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
            dir="rtl"
          />
           <Button onClick={handleCalculate} className="w-full mt-4" disabled={isValidating}>
            {isValidating ? t('validatingName') : t('calculateValue')}
          </Button>
        </Card>

        {error && !isLoading && <p className="text-red-400 my-4 text-center">{error}</p>}

        {gematriaValue !== null && !reading && !isLoading && (
          <div className="w-full max-w-md text-center animate-fade-in">
            <Card className="mb-6">
              <p className="text-lg font-semibold">{t('yourGematriaValueIs')}</p>
              <p className="text-6xl font-black text-brand-accent my-2">{gematriaValue}</p>
            </Card>
            <Button onClick={handleGetReading} disabled={isLoading}>
              {t('getYourReading')}
            </Button>
          </div>
        )}

        {isLoading && <Spinner />}

        {(reading || isStreaming) && !isLoading && (
          <div className="mt-8 w-full max-w-2xl animate-fade-in">
            <Card>
              <div className="p-4">
                  <h3 className="text-2xl font-bold text-brand-accent mb-4 text-center">{t('gematriaReadingFor', { value: gematriaValue! })}</h3>
                  <p className={`text-lg whitespace-pre-wrap leading-relaxed text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {reading}
                    {isStreaming && <span className="inline-block w-1 h-5 bg-brand-accent animate-pulse ml-1 align-bottom"></span>}
                  </p>
              </div>
            </Card>
            <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={reset} disabled={isStreaming}>{t('newAnalysis')}</Button>
            </div>
          </div>
        )}

        <div className="mt-8">
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
        </div>
      </div>
    </div>
  );
};

export default GematriaPage;
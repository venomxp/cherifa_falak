import React, { useState, useEffect } from 'react';
import { Page } from '../types.ts';
import { getTaleeReadingStream } from '../services/geminiService.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import Spinner from './common/Spinner.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface TaleePageProps {
  page: Page;
  setPage: (page: Page) => void;
}

const TaleePage: React.FC<TaleePageProps> = ({ page, setPage }) => {
  const { language, t, userName, addReadingToHistory, readingHistory } = useSettings();
  const [name, setName] = useState<string>('');
  const [mothersName, setMothersName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [reading, setReading] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

  const handleAnalyze = async () => {
    if (!name.trim() || !mothersName.trim()) {
      setError(t('errorEnterBothNames'));
      return;
    }
    if (!gender) {
      setError(t('errorSelectGender'));
      return;
    }
    
    setError('');
    setIsCached(false);

    setIsLoading(true);
    setReading('');
    setIsStreaming(false);

    // 1. Check history for a reading from today
    const todayStr = new Date().toISOString().split('T')[0];
    const expectedTitle = t('taleeReadingHistoryTitle', { name, mothersName });

    const todaysReading = readingHistory.find(item => 
        item.type === 'Tale\'e' &&
        item.title === expectedTitle &&
        item.date.startsWith(todayStr)
    );

    if (todaysReading) {
        // Use timeout for smoother UX, showing the cached result
        setTimeout(() => {
            setReading(todaysReading.content);
            setIsCached(true);
            setIsLoading(false);
        }, 500);
        return;
    }

    // 2. If not in history, fetch from API
    let fullReading = '';
    try {
      const stream = await getTaleeReadingStream(name, mothersName, gender, language);
      setIsLoading(false);
      setIsStreaming(true);
      
      for await (const chunk of stream) {
        const textChunk = chunk.text;
        fullReading += textChunk;
        setReading(prev => prev + textChunk);
      }
    } catch (err) {
      setError(t('errorTaleeReading'));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      if (fullReading) {
        const title = t('taleeReadingHistoryTitle', { name, mothersName });
        addReadingToHistory({ type: 'Tale\'e', title, content: fullReading });
      }
    }
  };

  const reset = () => {
    setReading('');
    setMothersName('');
    setGender('');
    setError('');
    setIsCached(false);
    // keep user name
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-grow animate-fade-in box-border pb-24">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-4xl font-logo-en font-bold my-8 text-center text-brand-accent tracking-wider">
          {t('taleePageTitle')}
        </h2>

        {!reading && !isStreaming && (
          <>
            <Card className="w-full max-w-md mb-8">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold mb-2 text-brand-accent">
                        {t('yourName')}
                        </label>
                        <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('firstName')}
                        className="w-full p-3 bg-brand-light dark:bg-brand-dark text-brand-light-text dark:text-brand-text-light border border-brand-light-border dark:border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                        />
                    </div>
                    <div>
                        <label htmlFor="mothersName" className="block text-lg font-semibold mb-2 text-brand-accent">
                        {t('yourMothersName')}
                        </label>
                         <input
                        id="mothersName"
                        type="text"
                        value={mothersName}
                        onChange={(e) => setMothersName(e.target.value)}
                        placeholder={t('yourMothersName')}
                        className="w-full p-3 bg-brand-light dark:bg-brand-dark text-brand-light-text dark:text-brand-text-light border border-brand-light-border dark:border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                        />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold mb-2 text-brand-accent">{t('falkGenderPageTitle')}</label>
                      <div className="flex gap-2">
                        <Button onClick={() => setGender(t('falkFemale'))} variant={gender === t('falkFemale') ? 'primary' : 'secondary'} className="w-full">{t('female')}</Button>
                        <Button onClick={() => setGender(t('falkMale'))} variant={gender === t('falkMale') ? 'primary' : 'secondary'} className="w-full">{t('male')}</Button>
                      </div>
                    </div>
                </div>
                <Button onClick={handleAnalyze} disabled={isLoading} className="w-full mt-6" variant="primary">
                    {isLoading ? t('analyzing') : t('revealDestiny')}
                </Button>
            </Card>
            {error && !isLoading && <p className="text-red-400 my-4 text-center">{error}</p>}
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
          </>
        )}

        {isLoading && <Spinner />}
        
        {error && !isLoading && !reading && !isStreaming && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {(reading || isStreaming) && !isLoading && (
          <div className="mt-8 w-full max-w-2xl animate-fade-in">
            <Card>
              <div className="p-4">
                  <h3 className="text-2xl font-bold text-brand-accent mb-4 text-center">{t('taleeReadingHistoryTitle', { name, mothersName })}</h3>
                  {isCached && <p className="text-center text-sm text-brand-accent italic mb-4">{t('cachedReadingMessage')}</p>}
                  <p className={`text-lg whitespace-pre-wrap leading-relaxed text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {reading}
                    {isStreaming && <span className="inline-block w-1 h-5 bg-brand-accent animate-pulse ml-1 align-bottom"></span>}
                  </p>
              </div>
            </Card>
            <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={reset} disabled={isStreaming} variant="primary">{t('newAnalysis')}</Button>
                <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaleePage;
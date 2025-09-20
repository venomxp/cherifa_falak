import React, { useState, useEffect } from 'react';
import { Page } from '../types.ts';
import { getNumerologyReport } from '../services/geminiService.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import Spinner from './common/Spinner.tsx';
import { useSettings } from '../hooks/useSettings.tsx';
import DatePicker from './common/DatePicker.tsx';

interface NumerologyPageProps {
  page: Page;
  setPage: (page: Page) => void;
}

const NumerologyPage: React.FC<NumerologyPageProps> = ({ page, setPage }) => {
  const { language, t, userName, userDob, addReadingToHistory, readingHistory } = useSettings();
  const [name, setName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    if (userName) setName(userName);
    if (userDob) setDob(userDob);
  }, [userName, userDob]);


  const abjadMap: { [key: string]: number } = {
    'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ة': 5,
    'و': 6, 'ז': 7, 'ح': 8, 'ط': 9, 'ي': 10, 'ى': 10, 'ك': 20, 'ل': 30, 'م': 40, 
    'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 
    'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
  };

  const calculateGematria = (inputName: string): number => {
    return inputName.split('').reduce((sum, char) => sum + (abjadMap[char] || 0), 0);
  };

  const handleAnalyze = async () => {
    if (!name.trim() || !dob) {
      setError(t('errorEnterNameAndDob'));
      return;
    }
    setError('');
    setIsCached(false);
    
    setIsLoading(true);
    setReport('');
    setIsStreaming(false);

    // Check history for a reading from today
    const todayStr = new Date().toISOString().split('T')[0];
    const expectedTitle = t('numerologyReadingHistoryTitle', { name, dob });
    const todaysReading = readingHistory.find(item => 
        item.type === 'Numerology' &&
        item.title === expectedTitle &&
        item.date.startsWith(todayStr)
    );

    if (todaysReading) {
        setTimeout(() => {
            setReport(todaysReading.content);
            setIsCached(true);
            setIsLoading(false);
        }, 500);
        return;
    }

    // If not cached, fetch from API
    let fullReport = '';
    try {
      const gematriaValue = calculateGematria(name);
      const stream = await getNumerologyReport(name, dob, gematriaValue, language);
      setIsLoading(false);
      setIsStreaming(true);
      
      for await (const chunk of stream) {
        const textChunk = chunk.text;
        fullReport += textChunk;
        setReport(prev => prev + textChunk);
      }
    } catch (err) {
      setError(t('errorGenerateReport'));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      if (fullReport) {
        const title = t('numerologyReadingHistoryTitle', { name, dob });
        addReadingToHistory({ type: 'Numerology', title, content: fullReport });
      }
    }
  };

  const formatDateForDisplay = (dateString: string, lang: string, placeholder: string): string => {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return placeholder;
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const reset = () => {
    setReport('');
    setIsCached(false);
    setError('');
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-grow animate-fade-in box-border pb-24">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-4xl font-logo-en font-bold my-8 text-center text-brand-accent tracking-wider">
          {t('numerology')}
        </h2>

        {!report && !isStreaming && (
          <>
            <Card className="w-full max-w-md mb-8">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold mb-2 text-brand-accent">
                        {t('enterYourName')}
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
                        <label htmlFor="dob" className="block text-lg font-semibold mb-2 text-brand-accent">
                        {t('enterYourDob')}
                        </label>
                        <button
                          id="dob"
                          onClick={() => setIsDatePickerOpen(true)}
                          className="w-full p-3 bg-brand-light dark:bg-brand-dark text-brand-light-text dark:text-brand-text-light border border-brand-light-border dark:border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent text-left rtl:text-right"
                        >
                          {formatDateForDisplay(dob, language, t('selectDate'))}
                        </button>
                    </div>
                </div>
                <Button onClick={handleAnalyze} disabled={isLoading} className="w-full mt-6" variant="primary">
                    {isLoading ? t('analyzing') : t('analyzeYourNumbers')}
                </Button>
            </Card>
            {error && !isLoading && <p className="text-red-400 my-4 text-center">{error}</p>}
            <DatePicker
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onSet={(date) => { setDob(date); setIsDatePickerOpen(false); }}
              onClear={() => { setDob(''); setIsDatePickerOpen(false); }}
              initialDate={dob}
            />
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
          </>
        )}

        {isLoading && <Spinner />}
        
        {error && !isLoading && !report && !isStreaming && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {(report || isStreaming) && !isLoading && (
          <div className="mt-8 w-full max-w-2xl animate-fade-in">
            <Card>
              <div className="p-4">
                  <h3 className="text-2xl font-bold text-brand-accent mb-4 text-center">{t('yourNumerologyReport')}</h3>
                   {isCached && <p className="text-center text-sm text-brand-accent italic mb-4">{t('cachedReadingMessage')}</p>}
                  <p className={`text-lg whitespace-pre-wrap leading-relaxed text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {report}
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

export default NumerologyPage;
import React, { useState } from 'react';
import { Page, ZodiacSign } from '../types.ts';
import { ZODIAC_SIGNS } from '../constants.ts';
import { getHoroscope } from '../services/horoscopeService.ts';
import { getGeneratedHoroscope } from '../services/geminiService.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import Spinner from './common/Spinner.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface HoroscopePageProps {
  page: Page;
  setPage: (page: Page) => void;
}

type Period = 'daily' | 'weekly' | 'monthly';

const HoroscopePage: React.FC<HoroscopePageProps> = ({ page, setPage }) => {
  const { language, t, addReadingToHistory } = useSettings();
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [period, setPeriod] = useState<Period>('daily');
  const [horoscope, setHoroscope] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // State for the sign finder tool
  const [showSignFinder, setShowSignFinder] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<string>('');
  const [foundSign, setFoundSign] = useState<ZodiacSign | null>(null);

  const fetchHoroscope = async (sign: ZodiacSign, selectedPeriod: Period) => {
    setIsLoading(true);
    setError('');
    setHoroscope('');
    setIsStreaming(false);
    let fullHoroscope = '';

    try {
      if (selectedPeriod === 'daily') {
        const result = await getHoroscope(sign.value, language);
        fullHoroscope = result;
        setHoroscope(result);
      } else { // weekly or monthly use streaming
        const stream = await getGeneratedHoroscope(t(sign.translationKey), selectedPeriod, language);
        setIsLoading(false);
        setIsStreaming(true);
        let text = '';
        for await (const chunk of stream) {
          text += chunk.text;
          setHoroscope(text);
        }
        fullHoroscope = text;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : t('errorFetchHoroscope');
      setError(message);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      if (fullHoroscope && !fullHoroscope.includes('عذراً') && !fullHoroscope.includes('Sorry')) {
        const title = `${t(sign.translationKey)} - ${t(period)}`;
        addReadingToHistory({ type: 'Horoscope', title, content: fullHoroscope });
      }
    }
  };

  const handleSignSelect = (sign: ZodiacSign) => {
    setSelectedSign(sign);
    // When a new sign is selected, default to showing the current period's horoscope
    fetchHoroscope(sign, period);
  };
  
  const handlePeriodChange = (newPeriod: Period) => {
    if (selectedSign && newPeriod !== period) {
      setPeriod(newPeriod);
      fetchHoroscope(selectedSign, newPeriod);
    }
  };

  const getSignFromDate = (date: string): ZodiacSign | null => {
    if (!date) return null;
    const [, month, day] = date.split('-').map(Number);
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS.find(s => s.value === 'aries') || null;
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS.find(s => s.value === 'taurus') || null;
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS.find(s => s.value === 'gemini') || null;
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS.find(s => s.value === 'cancer') || null;
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS.find(s => s.value === 'leo') || null;
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS.find(s => s.value === 'virgo') || null;
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS.find(s => s.value === 'libra') || null;
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS.find(s => s.value === 'scorpio') || null;
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS.find(s => s.value === 'sagittarius') || null;
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS.find(s => s.value === 'capricorn') || null;
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS.find(s => s.value === 'aquarius') || null;
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return ZODIAC_SIGNS.find(s => s.value === 'pisces') || null;
    return null;
  };

  const handleFindSign = () => {
    const sign = getSignFromDate(birthDate);
    setFoundSign(sign);
  };
  
  const renderSignFinder = () => (
    <Card className="w-full mt-6 p-6 text-center animate-fade-in">
      <h3 className="text-2xl font-bold mb-4 text-brand-accent">{t('discoverYourSignTitle')}</h3>
      <p className="mb-4 text-brand-light-text/80 dark:text-brand-text-light/80">{t('discoverYourSignBody')}</p>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => {
          setBirthDate(e.target.value);
          setFoundSign(null); // Reset on change
        }}
        className="w-full p-3 bg-brand-light dark:bg-brand-dark text-brand-light-text dark:text-brand-text-light border border-brand-light-border dark:border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent mb-4"
      />
      <Button onClick={handleFindSign} disabled={!birthDate}>{t('findMySign')}</Button>
      {foundSign && (
        <div className="mt-6 p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-lg">
          <p className="text-lg">{t('yourSignIs')}</p>
          <p className="text-3xl font-bold text-brand-accent my-2">{foundSign.icon} {t(foundSign.translationKey)}</p>
          <p className="text-brand-light-text/80 dark:text-brand-text-light/80">{t('youCanNowSelect')}</p>
        </div>
      )}
    </Card>
  );

  const renderSignSelection = () => (
    <div className="text-center w-full max-w-3xl">
        <h2 className="text-4xl font-logo-en font-bold my-8 text-center text-brand-accent tracking-wider">{t('horoscopes')}</h2>
        <Card>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                {ZODIAC_SIGNS.map((sign) => (
                    <button
                        key={sign.value}
                        onClick={() => handleSignSelect(sign)}
                        className="flex flex-col items-center p-2 text-center bg-brand-dark/50 rounded-lg border border-transparent hover:border-brand-accent/50 hover:bg-brand-accent/10 transition-all duration-300 transform hover:scale-105"
                    >
                        <span className="text-4xl md:text-5xl">{sign.icon}</span>
                        <span className="mt-2 text-xs sm:text-sm font-semibold text-brand-text-light">{t(sign.translationKey)}</span>
                    </button>
                ))}
            </div>
        </Card>
         <div className="mt-8">
            {!showSignFinder ? (
                 <button 
                    onClick={() => setShowSignFinder(true)} 
                    className="text-brand-accent hover:text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 hover:bg-brand-accent/10"
                >
                    {t('discoverYourSignPrompt')}
                 </button>
            ) : (
                renderSignFinder()
            )}
        </div>
        <div className="mt-8">
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">
                {t('goHome')}
            </Button>
        </div>
    </div>
  );

  const renderHoroscopeDisplay = () => (
     <div className="w-full max-w-2xl animate-fade-in">
        <Card>
            <div className="text-center mb-6">
                <button onClick={() => setSelectedSign(null)} className="text-brand-accent hover:text-white mb-4 text-sm">
                    &larr; {t('backToSignSelection')}
                </button>
                <div className="flex items-center justify-center gap-4">
                     <span className="text-5xl">{selectedSign?.icon}</span>
                     <h2 className="text-3xl font-bold text-brand-accent">{selectedSign ? t(selectedSign.translationKey) : ''}</h2>
                </div>
                <div className="flex justify-center border border-brand-light-border dark:border-brand-border rounded-full p-1 mt-4 max-w-xs mx-auto bg-brand-light dark:bg-brand-dark">
                    <button onClick={() => handlePeriodChange('daily')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors ${period === 'daily' ? 'bg-brand-accent text-brand-button-text' : 'text-brand-light-text/70 dark:text-brand-text-light/70'}`}>{t('daily')}</button>
                    <button onClick={() => handlePeriodChange('weekly')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors ${period === 'weekly' ? 'bg-brand-accent text-brand-button-text' : 'text-brand-light-text/70 dark:text-brand-text-light/70'}`}>{t('weekly')}</button>
                    <button onClick={() => handlePeriodChange('monthly')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors ${period === 'monthly' ? 'bg-brand-accent text-brand-button-text' : 'text-brand-light-text/70 dark:text-brand-text-light/70'}`}>{t('monthly')}</button>
                </div>
            </div>
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-400 text-center">{error}</p>
            ) : (
                <p className={`text-lg whitespace-pre-wrap leading-relaxed p-4 text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {horoscope}
                  {isStreaming && <span className="inline-block w-1 h-5 bg-brand-accent animate-pulse ml-1 align-bottom"></span>}
                </p>
            )}
        </Card>
        <div className="text-center mt-6">
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">
                {t('goHome')}
            </Button>
        </div>
     </div>
  );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-grow animate-fade-in box-border pb-24">
      <div className="flex flex-col items-center w-full">
        {!selectedSign ? renderSignSelection() : renderHoroscopeDisplay()}
      </div>
    </div>
  );
};

export default HoroscopePage;
import React, { useState } from 'react';
import { Page, ZodiacSign } from '../types';
import { ZODIAC_SIGNS } from '../constants';
import { getHoroscope } from '../services/horoscopeService';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';
import { useSettings } from '../hooks/useSettings';

interface HoroscopePageProps {
  setPage: (page: Page) => void;
}

type Period = 'daily' | 'weekly' | 'monthly';

const HoroscopePage: React.FC<HoroscopePageProps> = ({ setPage }) => {
  const { language, t } = useSettings();
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [period, setPeriod] = useState<Period>('daily');
  const [horoscope, setHoroscope] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // State for the sign finder tool
  const [showSignFinder, setShowSignFinder] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<string>('');
  const [foundSign, setFoundSign] = useState<ZodiacSign | null>(null);

  const handleSignSelect = async (sign: ZodiacSign, selectedPeriod: Period = 'daily') => {
    setSelectedSign(sign);
    setIsLoading(true);
    setError('');
    setHoroscope('');
    setPeriod(selectedPeriod);
    try {
      const result = await getHoroscope(sign.value, selectedPeriod, language);
      setHoroscope(result);
    } catch (err) {
      setError(t('errorFetchHoroscope'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePeriodChange = async (newPeriod: Period) => {
    if (selectedSign && newPeriod !== period) {
        setPeriod(newPeriod);
        setIsLoading(true);
        setError('');
        setHoroscope('');
        try {
          const result = await getHoroscope(selectedSign.value, newPeriod, language);
          setHoroscope(result);
        } catch (err) {
          setError(t('errorFetchHoroscope'));
        } finally {
          setIsLoading(false);
        }
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
    <Card className="w-full max-w-md mt-6 p-6 text-center animate-fade-in">
      <h3 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-200">{t('discoverYourSignTitle')}</h3>
      <p className="mb-4 text-slate-700 dark:text-amber-100/80">{t('discoverYourSignBody')}</p>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => {
          setBirthDate(e.target.value);
          setFoundSign(null); // Reset on change
        }}
        className="w-full p-3 bg-white/50 dark:bg-[#221E1F]/50 text-slate-800 dark:text-white border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4 dark:[color-scheme:dark]"
      />
      <Button onClick={handleFindSign} disabled={!birthDate}>{t('findMySign')}</Button>
      {foundSign && (
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-lg">{t('yourSignIs')}</p>
          <p className="text-3xl font-bold text-amber-700 dark:text-amber-300 my-2">{foundSign.icon} {t(foundSign.translationKey)}</p>
          <p className="text-slate-700 dark:text-amber-100/80">{t('youCanNowSelect')}</p>
        </div>
      )}
    </Card>
  );

  const renderSignSelection = () => (
    <div className="text-center w-full max-w-3xl">
        <h2 className="text-4xl font-bold my-8 text-center text-amber-700 dark:text-amber-300">{t('horoscopePageTitle')}</h2>
        <Card>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                {ZODIAC_SIGNS.map((sign) => (
                    <button
                        key={sign.value}
                        onClick={() => handleSignSelect(sign)}
                        className="flex flex-col items-center p-2 text-center bg-black/5 dark:bg-black/10 rounded-lg border border-transparent hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300 transform hover:scale-105"
                    >
                        <span className="text-4xl md:text-5xl">{sign.icon}</span>
                        <span className="mt-2 text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-200">{t(sign.translationKey)}</span>
                    </button>
                ))}
            </div>
        </Card>
         <div className="mt-8">
            {!showSignFinder ? (
                 <button 
                    onClick={() => setShowSignFinder(true)} 
                    className="text-amber-700 dark:text-amber-200 hover:text-amber-900 dark:hover:text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 hover:bg-black/5 dark:hover:bg-white/10"
                >
                    {t('discoverYourSignPrompt')}
                 </button>
            ) : (
                renderSignFinder()
            )}
        </div>
    </div>
  );

  const renderHoroscopeDisplay = () => (
     <div className="w-full max-w-2xl animate-fade-in">
        <Card>
            <div className="text-center mb-6">
                <button onClick={() => setSelectedSign(null)} className="text-amber-600 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-100 mb-4 text-sm">
                    &larr; {t('backToSignSelection')}
                </button>
                <div className="flex items-center justify-center gap-4">
                     <span className="text-5xl">{selectedSign?.icon}</span>
                     <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-300">{selectedSign ? t(selectedSign.translationKey) : ''}</h2>
                </div>
                <div className="flex justify-center border border-amber-500/30 rounded-full p-1 mt-4 max-w-xs mx-auto bg-black/10 dark:bg-black/20">
                    <button onClick={() => handlePeriodChange('daily')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors ${period === 'daily' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-800 dark:text-amber-200'}`}>{t('daily')}</button>
                    <button onClick={() => handlePeriodChange('weekly')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors ${period === 'weekly' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-800 dark:text-amber-200'}`}>{t('weekly')}</button>
                    <button onClick={() => handlePeriodChange('monthly')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors ${period === 'monthly' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-800 dark:text-amber-200'}`}>{t('monthly')}</button>
                </div>
            </div>
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-400 text-center">{error}</p>
            ) : (
                <p className={`text-lg whitespace-pre-wrap leading-relaxed p-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{horoscope}</p>
            )}
        </Card>
     </div>
  );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in">
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        {!selectedSign ? renderSignSelection() : renderHoroscopeDisplay()}
      </div>
      <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
          {t('goHome')}
      </Button>
    </div>
  );
};

export default HoroscopePage;
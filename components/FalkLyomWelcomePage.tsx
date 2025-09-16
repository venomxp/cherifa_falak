import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import { useSettings } from '../hooks/useSettings';
import TarotCard from './common/TarotCard';

interface FalkLyomWelcomePageProps {
  setPage: (page: Page) => void;
}

const FalkLyomWelcomePage: React.FC<FalkLyomWelcomePageProps> = ({ setPage }) => {
  const { t } = useSettings();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center h-screen justify-center animate-fade-in space-y-8 text-center box-border pb-28">
      
      <div className="relative w-64 h-48 flex items-center justify-center -mb-4">
         {/* A decorative fan of cards */}
        <div className="absolute w-28 h-40 transform -rotate-15 -translate-x-10">
            <TarotCard />
        </div>
        <div className="absolute w-28 h-40 transform rotate-15 translate-x-10 z-20">
            <TarotCard />
        </div>
         <div className="absolute w-28 h-40 z-10 transform -translate-y-4">
            <TarotCard />
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-bold text-violet-700 dark:text-violet-300">
          {t('falkLyomWelcomeTitle')}
        </h2>
        <p className="text-xl mt-2 text-slate-600 dark:text-slate-300/80">
          {t('falkLyomWelcomeSubtitle')}
        </p>
      </div>

      <Button onClick={() => setPage(Page.FALK_LYOM_GENDER)} className="text-xl px-10 py-4">
        {t('startReading')}
      </Button>
    </div>
  );
};

export default FalkLyomWelcomePage;
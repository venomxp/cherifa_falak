import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import { useSettings } from '../hooks/useSettings.tsx';
import TarotCard from './common/TarotCard.tsx';

interface FalkLyomWelcomePageProps {
  setPage: (page: Page) => void;
}

const FalkLyomWelcomePage: React.FC<FalkLyomWelcomePageProps> = ({ setPage }) => {
  const { t } = useSettings();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow animate-fade-in space-y-8 text-center box-border">
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
        <h2 className="text-5xl font-bold text-brand-accent">
          {t('falkLyomWelcomeTitle')}
        </h2>
        <p className="text-xl mt-2 text-brand-light-text/70 dark:text-brand-text-light/70">
          {t('falkLyomWelcomeSubtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setPage(Page.FALK_LYOM_GENDER)} className="text-xl px-10 py-4">
          {t('startReading')}
        </Button>
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">
            {t('goHome')}
        </Button>
      </div>
    </div>
  );
};

export default FalkLyomWelcomePage;
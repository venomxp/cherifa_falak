import React from 'react';
import { Page } from '../../types';
import { useSettings } from '../../hooks/useSettings';

interface LogoProps {
  className?: string;
  setPage?: (page: Page) => void;
}

const Logo: React.FC<LogoProps> = ({ className, setPage }) => {
  const { t } = useSettings();
  
  const Card = ({ rotation, translation, zIndex }: { rotation: string; translation: string; zIndex: string }) => (
    <div 
      className={`absolute w-14 h-20 [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.4))] transition-transform transform ${rotation} ${translation} ${zIndex}`}
    >
      <div className="w-full h-full bg-[#221E1F] rounded-md p-2 flex items-center justify-center">
        <div className="w-full h-full border-2 border-amber-400/50 rounded-sm flex items-center justify-center">
          <svg width="55%" height="55%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#F5EFE6" strokeWidth="4"/>
            <circle cx="50" cy="50" r="25" stroke="#9A6A5C" strokeWidth="4"/>
            <circle cx="50" cy="50" r="10" fill="#F5EFE6"/>
          </svg>
        </div>
      </div>
    </div>
  );

  // The visual part of the logo (the cards) is separated to be conditionally wrapped in a button.
  const cardsVisual = (
    <div className="relative w-36 h-28 flex items-center justify-center">
      {/* A soft yellow glow is added behind the cards to make them pop from the dark background. */}
      <div className="absolute inset-0 bg-amber-400/50 rounded-full blur-3xl -z-10"></div>
      <Card rotation="-rotate-15" translation="-translate-x-5" zIndex="z-0" />
      <Card rotation="rotate-15" translation="translate-x-5" zIndex="z-10" />
      <Card rotation="rotate-0" translation="-translate-y-3" zIndex="z-20" />
    </div>
  );

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {/* Conditionally render the cards as a button if setPage is provided */}
      {setPage ? (
        <button
          onClick={() => setPage(Page.HOME)}
          className="focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-lg p-2 -m-2 transition-transform transform hover:scale-105"
          aria-label={t('goBackToHomeAria')}
        >
          {cardsVisual}
        </button>
      ) : (
        // Otherwise, render it as a static element
        cardsVisual
      )}

      {/* The title is always rendered as static text outside the button */}
      <h1 className="text-2xl font-bold text-slate-800 dark:text-[#F5EFE6]" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
        {t('appName')}
      </h1>
    </div>
  );
};

export default Logo;
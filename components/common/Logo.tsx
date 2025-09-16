import React from 'react';
import { Page } from '../../types';
import { useSettings } from '../../hooks/useSettings';

interface LogoProps {
  className?: string;
  setPage?: (page: Page) => void;
}

const Logo: React.FC<LogoProps> = ({ className, setPage }) => {
  const { t } = useSettings();
  
  const Card = ({ rotation, translation, zIndex }: { rotation: string; translation: string; zIndex:string }) => (
    <div 
      className={`absolute w-10 h-14 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.3))] transition-transform transform ${rotation} ${translation} ${zIndex}`}
    >
      <div className="w-full h-full bg-[#221E1F] rounded-md p-1 flex items-center justify-center">
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

  // Updated to show two tilted cards, resembling the user's reference image.
  const cardsVisual = (
    <div className="relative w-16 h-20 flex items-center justify-center">
      {/* A soft yellow glow is added behind the cards to make them pop from the dark background. */}
      <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-2xl -z-10"></div>
      <Card rotation="-rotate-[20deg]" translation="-translate-x-2" zIndex="z-0" />
      <Card rotation="rotate-[8deg]" translation="translate-x-2" zIndex="z-10" />
    </div>
  );

  const appNameParts = t('appName').split(' - ');
  const latinPart = appNameParts[0];
  const arabicPart = appNameParts[1];

  // The direction is forced to LTR to maintain the visual order of [Icon] [English] - [Arabic]
  // regardless of the app's language setting, as requested.
  const logoAndText = (
    <div className="flex flex-row items-center gap-2" style={{ direction: 'ltr' }}>
      {cardsVisual}
      <h1 className="text-3xl font-bold text-center" aria-label={t('appName')}>
          <span className="font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500 drop-shadow-sm">{latinPart}</span>
          <span className="text-amber-600 dark:text-amber-400 mx-1">-</span>
          <span className="font-marhey bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500 drop-shadow-sm">{arabicPart}</span>
      </h1>
    </div>
  );

  return (
    <div className={className}>
      {/* Conditionally render the logo as a button if setPage is provided */}
      {setPage ? (
        <button
          onClick={() => setPage(Page.HOME)}
          className="focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-lg p-2 -m-2 transition-transform transform hover:scale-105"
          aria-label={t('goBackToHomeAria')}
        >
          {logoAndText}
        </button>
      ) : (
        // Otherwise, render it as a static element
        logoAndText
      )}
    </div>
  );
};

export default Logo;
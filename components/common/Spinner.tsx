import React from 'react';
import { useSettings } from '../../hooks/useSettings';

const Spinner: React.FC = () => {
  const { t } = useSettings();

  // The back of the card, styled consistently with other cards in the app.
  const cardBack = (
    <div className="w-full h-full bg-[#221E1F] rounded-md p-1 flex items-center justify-center shadow-md shadow-black/50">
      <div className="w-full h-full border border-amber-400/50 rounded-sm flex items-center justify-center">
        <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#F5EFE6" strokeWidth="4"/>
          <circle cx="50" cy="50" r="25" stroke="#9A6A5C" strokeWidth="4"/>
          <circle cx="50" cy="50" r="10" fill="#F5EFE6"/>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center my-8" aria-label={t('loadingAria')}>
      {/* Container for the dealing animation, made smaller as requested */}
      <div className="relative w-24 h-20">
        {/* Three cards with staggered animation delays to create a dealing effect.
            CSS custom properties (--tx, --rot) are used to set the final position for each card in the keyframe animation. */}
        <div 
          className="absolute left-1/2 top-1/2 w-10 h-16 animate-deal"
          style={{ '--tx': '-30px', '--rot': '-15deg', animationDelay: '0s' } as React.CSSProperties}
        >
          {cardBack}
        </div>
        <div 
          className="absolute left-1/2 top-1/2 w-10 h-16 animate-deal"
          style={{ '--tx': '0px', '--rot': '0deg', animationDelay: '0.2s', zIndex: 1 } as React.CSSProperties}
        >
          {cardBack}
        </div>
        <div 
          className="absolute left-1/2 top-1/2 w-10 h-16 animate-deal"
          style={{ '--tx': '30px', '--rot': '15deg', animationDelay: '0.4s' } as React.CSSProperties}
        >
          {cardBack}
        </div>
      </div>
    </div>
  );
};

export default Spinner;
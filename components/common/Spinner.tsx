import React from 'react';
import { useSettings } from '../../hooks/useSettings';

// A single card component for the spinner animation
const SpinnerCard: React.FC<{ animationClass: string; zIndex: string; }> = ({ animationClass, zIndex }) => (
  <div
    className={`absolute w-10 h-16 bg-[#221E1F] rounded-md p-1 shadow-lg transform-gpu ${animationClass} ${zIndex}`}
  >
    <div className="w-full h-full border border-violet-500/60 rounded-sm flex items-center justify-center">
      {/* Simplified symbol for clarity at small sizes */}
      <svg width="50%" height="50%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="#a78bfa" strokeWidth="10"/>
        <circle cx="50" cy="50" r="12" fill="#F5EFE6"/>
      </svg>
    </div>
  </div>
);

const Spinner: React.FC = () => {
  const { t } = useSettings();
  
  // An animation of three tarot cards fanning out and back in.
  return (
    <div className="flex justify-center items-center my-8" aria-label={t('loadingAria')}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* The cards are layered with z-index and animated with custom keyframes. */}
        <SpinnerCard animationClass="animate-fan-left" zIndex="z-0" />
        <SpinnerCard animationClass="animate-fan-center" zIndex="z-10" />
        <SpinnerCard animationClass="animate-fan-right" zIndex="z-0" />
      </div>
    </div>
  );
};

export default Spinner;
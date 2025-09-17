import React from 'react';
import { Page } from '../../types';
import { useSettings } from '../../hooks/useSettings';

interface LogoProps {
  className?: string;
  setPage?: (page: Page) => void;
}

const Logo: React.FC<LogoProps> = ({ className, setPage }) => {
  const { t } = useSettings();
  
  const cardsVisual = (
    <div className="relative w-12 h-12 flex items-center justify-center group">
      <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-lg transition-all duration-500 group-hover:blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="transition-transform duration-500 ease-in-out group-hover:scale-110">
          <g transform="rotate(-20 50 50) translate(0, 5)">
            <rect x="35" y="20" width="30" height="45" rx="3" fill="#222222" stroke="url(#goldGradient)" strokeWidth="1"/>
            <path d="M50 38 a 9 9 0 0 1 -3 -17.5 a 12 12 0 0 0 0 17" fill="url(#goldGradient)"/>
          </g>
          <g transform="rotate(20 50 50) translate(0, 5)">
            <rect x="35" y="20" width="30" height="45" rx="3" fill="#222222" stroke="url(#goldGradient)" strokeWidth="1"/>
            <path d="M50 35 l2.35 4.76 5.25.77 -3.8 3.7 .9 5.23 -4.7 -2.47 -4.7 2.47 .9-5.23 -3.8-3.7 5.25-.77z" fill="url(#goldGradient)"/>
          </g>
          <g transform="translate(0, -2)" className="transition-transform duration-500 ease-in-out group-hover:-translate-y-4">
            <rect x="32.5" y="15" width="35" height="50" rx="4" fill="#1A1A1A" stroke="url(#goldGradient)" strokeWidth="1.5"/>
            <circle cx="50" cy="40" r="7" fill="url(#goldGradient)"/>
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="50" y1="40" x2={50 + 11 * Math.cos(i * Math.PI / 4)} y2={40 + 11 * Math.sin(i * Math.PI / 4)} stroke="url(#goldGradient)" strokeWidth="1"/>
            ))}
          </g>
        </g>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D48C5E" />
            <stop offset="100%" stopColor="#B87850" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  const appNameParts = t('appName').split(' - ');
  const latinPart = appNameParts[0];
  const arabicPart = appNameParts[1];

  // The direction is forced to LTR to maintain the visual order of [Icon] [English] - [Arabic]
  // regardless of the app's language setting.
  const logoAndText = (
    <div className="flex flex-row items-center gap-2" style={{ direction: 'ltr' }}>
      {cardsVisual}
      <h1 className="text-lg font-bold text-center" aria-label={t('appName')}>
          <span className="font-logo-en bg-clip-text text-transparent bg-gradient-to-br from-brand-accent to-brand-accent-dark drop-shadow-sm">{latinPart}</span>
          <span className="text-brand-accent/70 mx-1">-</span>
          <span className="font-logo-ar bg-clip-text text-transparent bg-gradient-to-br from-brand-accent to-brand-accent-dark drop-shadow-sm">{arabicPart}</span>
      </h1>
    </div>
  );

  return (
    <div className={className}>
      {setPage ? (
        <button
          onClick={() => setPage(Page.HOME)}
          className="focus:outline-none focus:ring-2 focus:ring-brand-accent/50 rounded-lg p-2 -m-2 transition-transform transform hover:scale-105"
          aria-label={t('goBackToHomeAria')}
        >
          {logoAndText}
        </button>
      ) : (
        logoAndText
      )}
    </div>
  );
};

export default Logo;

import React from 'react';
import { Page } from '../types';
import { useSettings } from '../hooks/useSettings';
import CategoryButton from './common/CategoryButton';
import Logo from './common/Logo';

// --- SVG Icons for Category Buttons ---

// A stylized icon representing a Moroccan tarot card with a king on it.
const FalkLyomIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-5 12 12)">
            {/* Card border */}
            <rect x="5" y="2" width="14" height="20" rx="2"/>
            {/* Stylized King's Crown */}
            <path d="M9.5 7L12 9l2.5-2" />
            <path d="M9.5 7l-1-2h7l-1 2" />
            {/* Stylized King's Face/Bust */}
            <path d="M9 11a3 3 0 1 1 6 0v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-3z" />
            {/* Detail on robe */}
            <path d="M12 15v2" />
        </g>
    </svg>
);


// Icon of two overlapping tarot cards, inspired by the app's logo.
const TarotIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
            <g id="tarot-symbol-icon" strokeWidth="1">
                {/* A simplified version of the logo's symbol */}
                <path d="M0 -3 L2 0 L0 3 L-2 0 Z" />
                <circle cx="0" cy="0" r="1.5" />
            </g>
        </defs>

        <g transform="rotate(-5 12 12)">
            {/* Card in the back, tilted left */}
            <g transform="rotate(-15 12 12)">
                <rect x="4" y="3" width="12" height="18" rx="2" />
                <use href="#tarot-symbol-icon" x="10" y="12" />
            </g>
            {/* Card in the front, tilted right */}
            <g transform="rotate(8 12 12)">
                <rect x="8" y="3" width="12" height="18" rx="2" />
                <use href="#tarot-symbol-icon" x="14" y="12" />
            </g>
        </g>
    </svg>
);


// A stylized icon of a zodiac wheel, representing horoscopes.
const HoroscopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <g transform="rotate(-5 12 12)">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      {/* Spokes from inner to outer circle */}
      <line x1="12" y1="3" x2="12" y2="9.5" />
      <line x1="12" y1="14.5" x2="12" y2="21" />
      <line x1="3" y1="12" x2="9.5" y2="12" />
      <line x1="14.5" y1="12" x2="21" y2="12" />
      <line x1="5.64" y1="5.64" x2="10.2" y2="10.2" />
      <line x1="13.8" y1="13.8" x2="18.36" y2="18.36" />
      <line x1="5.64" y1="18.36" x2="10.2" y2="13.8" />
      <line x1="13.8" y1="10.2" x2="18.36" y2="5.64" />
    </g>
  </svg>
);

// A mystical diamond shape containing the number 7, symbolizing spiritual numbers.
const NumerologyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-5 12 12)">
            <path d="M12 2 L18 12 L12 22 L6 12 Z" />
            {/* Number 7 inside the diamond */}
            <path d="M10 10h4l-2 6" />
        </g>
    </svg>
);

// Icon of two connected hearts for compatibility
const CompatibilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <g transform="rotate(-5 12 12)">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" opacity="0.6" transform="translate(2 2) scale(0.8)" />
    </g>
  </svg>
);

// Icon of the WhatsApp logo
const PrivateReadingIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-5 12 12)">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            <path d="M16.4 13.5c-.3-.2-1.8-1-2.1-1.1-.3-.1-.5-.1-.7.1-.2.2-.8.9-1 1.1-.2.2-.4.2-.6.1s-1.6-.6-3-1.8c-1.1-1-1.8-2.2-2-2.5-.2-.3 0-.5.1-.6s.2-.2.4-.4.2-.3.3-.5.1-.5 0-.7c-.1-.2-1-2.4-1.4-3.2-.3-.8-.7-1-.9-1h-.5c-.2 0-.5.1-.7.3-.2.2-.8.8-1 2s-1 2.3-.2 3.8c.8 1.5 1.8 2.8 3.2 4s2.8 1.9 4.3 2.5c1.5.6 2.8.5 3.8.3s1.6-.9 1.8-1.2.3-.5.2-.7c-.1-.1-.3-.2-.5-.3z"></path>
        </g>
    </svg>
);

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t } = useSettings();
  
  const categories = [
    { page: Page.FALK_LYOM_WELCOME, title: t('falkLyom'), description: t('falkLyomDesc'), icon: <FalkLyomIcon /> },
    { page: Page.TAROT, title: t('tarotReading'), description: t('tarotReadingDesc'), icon: <TarotIcon /> },
    { page: Page.HOROSCOPE, title: t('horoscopes'), description: t('horoscopesDesc'), icon: <HoroscopeIcon /> },
    { page: Page.NUMEROLOGY, title: t('numerology'), description: t('numerologyDesc'), icon: <NumerologyIcon /> },
    { page: Page.COMPATIBILITY, title: t('compatibility'), description: t('compatibilityDesc'), icon: <CompatibilityIcon /> },
    { page: Page.PRIVATE_READING, title: t('privateReading'), description: t('privateReadingDesc'), icon: <PrivateReadingIcon /> },
  ];

  return (
    <div className="container mx-auto px-4 flex flex-col h-screen animate-fade-in box-border overflow-hidden">
      <main className="w-full max-w-md mx-auto flex flex-col flex-grow pt-4 pb-24">
        <header className="flex flex-col items-center">
          <Logo />
          <p className="mt-2 text-sm text-brand-light-text/70 dark:text-brand-text-light/70 max-w-xs mx-auto text-center">
            {t('appSlogan')}
          </p>
        </header>
        
        <div className="flex-grow flex flex-col justify-center gap-2 py-2">
          {categories.map((cat) => (
            <CategoryButton
              key={cat.title}
              onClick={() => setPage(cat.page)}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
            />
          ))}
        </div>
      </main>

    </div>
  );
};

export default HomePage;
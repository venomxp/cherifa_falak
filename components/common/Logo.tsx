import React from 'react';
import { Page } from '../../types.ts';
import { useSettings } from '../../hooks/useSettings.tsx';

interface LogoProps {
  className?: string;
  setPage?: (page: Page) => void;
}

const Logo: React.FC<LogoProps> = ({ className, setPage }) => {
  const { t } = useSettings();
  
  const logoUrlLight = "https://i.imgur.com/HtZli5a.png";
  const logoUrlDark = "https://i.imgur.com/N3xZ1vF.png";

  const logoVisual = (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Light mode logo, hidden in dark mode */}
      <img 
        src={logoUrlLight} 
        alt="Falkom App Logo" 
        className="w-full h-full object-contain dark:hidden"
      />
      {/* Dark mode logo, hidden by default, shown in dark mode */}
      <img 
        src={logoUrlDark} 
        alt="Falkom App Logo" 
        className="w-full h-full object-contain hidden dark:block"
      />
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
          {logoVisual}
        </button>
      ) : (
        logoVisual
      )}
    </div>
  );
};

export default Logo;
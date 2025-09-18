import React from 'react';
import { useSettings } from '../../hooks/useSettings';

const Spinner: React.FC = () => {
  const { t } = useSettings();
  
  return (
    <div className="flex justify-center items-center my-8" aria-label={t('loadingAria')}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-brand-light-text/20 dark:border-brand-accent/30 rounded-full animate-spin"></div>
        <div className="absolute inset-2 flex items-center justify-center text-brand-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
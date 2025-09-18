import React from 'react';
import { Page } from '../../types';
import { triggerHapticFeedback } from '../../utils/haptics';
import { useSettings } from '../../hooks/useSettings';

interface CloseButtonProps {
  setPage: (page: Page) => void;
  targetPage?: Page;
}

const CloseButton: React.FC<CloseButtonProps> = ({ setPage, targetPage = Page.HOME }) => {
  const { t } = useSettings();
  const handleClick = () => {
    triggerHapticFeedback();
    setPage(targetPage);
  };
  return (
    <button
      onClick={handleClick}
      className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-50 p-2 rounded-full text-brand-light-text/70 dark:text-brand-text-light/70 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
      aria-label={t('goHome')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default CloseButton;

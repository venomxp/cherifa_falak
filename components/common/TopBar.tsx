import React from 'react';
import { Page } from '../../types.ts';
import Logo from './Logo.tsx';
import { triggerHapticFeedback } from '../../utils/haptics.ts';

interface TopBarProps {
  toggleMenu: () => void;
  setPage: (page: Page) => void;
}

const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const TopBar: React.FC<TopBarProps> = ({ toggleMenu, setPage }) => {

  const handleToggleMenu = () => {
    triggerHapticFeedback();
    toggleMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-lg border-b border-brand-light-border dark:border-brand-border">
      <div className="container mx-auto h-full flex items-center justify-center relative px-4">
        <button
          onClick={handleToggleMenu}
          className="absolute left-4 rtl:left-auto rtl:right-4 p-2 rounded-full text-brand-light-text dark:text-brand-text-light hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
          aria-label="Open navigation menu"
        >
          <HamburgerIcon className="w-8 h-8" />
        </button>
        <Logo setPage={setPage} />
      </div>
    </header>
  );
};

export default TopBar;
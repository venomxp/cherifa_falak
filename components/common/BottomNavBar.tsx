import React from 'react';
import { Page } from '../../types.ts';
import { useSettings } from '../../hooks/useSettings.tsx';
import { triggerHapticFeedback } from '../../utils/haptics.ts';

interface BottomNavBarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const NavButton: React.FC<{
  onClick?: () => void;
  isActive: boolean;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, isActive, label, children, disabled }) => {

  const handleClick = () => {
    triggerHapticFeedback();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 rounded-full transition-all duration-300 h-11 ${
        isActive
          ? 'bg-brand-accent text-brand-dark shadow-lg shadow-brand-accent/20 px-4 w-auto'
          : `text-brand-light-text/70 dark:text-brand-text-light/70 w-11 ${disabled ? '' : 'hover:bg-black/5 dark:hover:bg-white/10'}`
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
      {isActive && <span className="text-sm font-semibold whitespace-nowrap">{label}</span>}
    </button>
  );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentPage, setPage }) => {
  const { t } = useSettings();

  const HomeIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const AccountIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const SettingsNavIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const isHomePage = currentPage === Page.HOME;
  const isProfilePage = currentPage === Page.PROFILE;
  const isSettingsPage = currentPage === Page.SETTINGS;

  return (
    <footer className="p-4 flex justify-center animate-fade-in pointer-events-auto">
      <div className="w-full max-w-sm flex items-center justify-around gap-2 bg-white/70 dark:bg-brand-light-dark/70 backdrop-blur-lg rounded-full p-2 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
        
        <NavButton
          onClick={() => setPage(Page.SETTINGS)}
          isActive={isSettingsPage}
          label={t('settings')}
        >
          <SettingsNavIcon className="w-6 h-6" />
        </NavButton>

        <NavButton
          onClick={() => setPage(Page.HOME)}
          isActive={isHomePage}
          label={t('home')}
        >
          <HomeIcon className="w-6 h-6" />
        </NavButton>

        <NavButton
          onClick={() => setPage(Page.PROFILE)}
          isActive={isProfilePage}
          label={t('profile')}
        >
           <AccountIcon className="w-6 h-6" />
        </NavButton>

      </div>
    </footer>
  );
};

export default BottomNavBar;
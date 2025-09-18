import React from 'react';
import { Page } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { triggerHapticFeedback } from '../../utils/haptics';

// Icons for the menu
const HomeIcon = ({ className }: { className: string }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> );
const AccountIcon = ({ className }: { className: string }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );
const SettingsNavIcon = ({ className }: { className: string }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );


interface SideNavMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  currentPage: Page;
  setPage: (page: Page) => void;
}

const SideNavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    label: string;
    children: React.ReactNode;
}> = ({ onClick, isActive, label, children }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full p-4 rounded-lg text-left rtl:text-right transition-colors duration-200 ${
                isActive
                ? 'bg-brand-accent text-brand-button-text'
                : 'text-brand-light-text dark:text-brand-text-light/80 hover:bg-black/5 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
        >
            <div className="w-6 h-6 mr-4 rtl:mr-0 rtl:ml-4">{children}</div>
            <span className="text-lg font-semibold">{label}</span>
        </button>
    );
};


const SideNavMenu: React.FC<SideNavMenuProps> = ({ isOpen, closeMenu, currentPage, setPage }) => {
  const { t, language } = useSettings();

  const handleNavigate = (page: Page) => {
    triggerHapticFeedback();
    setPage(page);
    closeMenu();
  };

  const navItems = [
    { page: Page.HOME, label: t('home'), icon: <HomeIcon className="w-6 h-6" /> },
    { page: Page.PROFILE, label: t('profile'), icon: <AccountIcon className="w-6 h-6" /> },
    { page: Page.SETTINGS, label: t('settings'), icon: <SettingsNavIcon className="w-6 h-6" /> },
  ];
  
  const menuPositionClass = language === 'ar' ? 'right-0' : 'left-0';

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      onClick={closeMenu}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Menu Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 h-full w-72 max-w-[80vw] bg-brand-light dark:bg-brand-light-dark shadow-2xl transition-all duration-300 ease-in-out ${menuPositionClass} ${
          isOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')
        }`}
      >
        <div className="p-4 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-brand-accent p-4">{t('appName')}</h2>
            <nav className="mt-4 space-y-2">
                {navItems.map(item => (
                    <SideNavLink
                        key={item.page}
                        onClick={() => handleNavigate(item.page)}
                        isActive={currentPage === item.page}
                        label={item.label}
                    >
                        {item.icon}
                    </SideNavLink>
                ))}
            </nav>
        </div>
      </div>
    </div>
  );
};

export default SideNavMenu;
import React, { useState } from 'react';
import { Page } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import Card from './common/Card.tsx';
import LanguagePickerModal from './common/LanguagePickerModal.tsx';
import { triggerHapticFeedback } from '../utils/haptics.ts';
import Button from './common/Button.tsx';

// --- SVG Icons ---
const LanguageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>;
const ThemeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" /></svg>;
const PolicyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.752A11.959 11.959 0 0112 2.75c-2.126 0-4.142.64-5.834 1.72z" /></svg>;
const TermsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;

// --- Main Settings Page Component ---
interface SettingsPageProps {
  setPage: (page: Page) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ setPage }) => {
    const { language, t, theme, setTheme } = useSettings();
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

    const handleRateApp = () => {
        triggerHapticFeedback();
        window.open('https://play.google.com/store/apps/details?id=com.falkom.app', '_blank');
    };
    
    const handleContact = () => {
        triggerHapticFeedback();
        window.location.href = `mailto:${t('contactEmail')}`;
    };

    const handleSetTheme = (newTheme: 'light' | 'dark') => {
        triggerHapticFeedback();
        setTheme(newTheme);
    };

    const handleNavigate = (page: Page) => {
        triggerHapticFeedback();
        setPage(page);
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center animate-fade-in box-border pb-12">
            <h2 className="text-4xl font-logo-en font-bold my-8 text-center text-brand-accent tracking-wider">{t('settings')}</h2>
            <div className="w-full max-w-lg space-y-4">
                
                <Card>
                    <div className="divide-y divide-brand-light-border dark:divide-brand-border">
                        {/* Language Setting */}
                        <button onClick={() => { triggerHapticFeedback(); setIsLanguageModalOpen(true); }} className="flex items-center w-full p-4 text-left rtl:text-right hover:bg-brand-accent/5 transition-colors rounded-t-lg">
                            <div className="w-8 h-8 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 flex items-center justify-center text-brand-accent"><LanguageIcon /></div>
                            <span className="flex-grow text-lg font-medium text-brand-light-text dark:text-brand-text-light">{t('language')}</span>
                            <span className="text-brand-light-text/70 dark:text-brand-text-light/70 mr-2 rtl:mr-0 rtl:ml-2">
                                {language === 'ar' ? t('arabic') : language === 'fr' ? t('french') : t('english')}
                            </span>
                            <ChevronRightIcon />
                        </button>
                        
                        {/* Theme Setting */}
                        <div className="flex items-center w-full p-4 rounded-b-lg">
                            <div className="w-8 h-8 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 flex items-center justify-center text-brand-accent"><ThemeIcon /></div>
                            <span className="flex-grow text-lg font-medium text-brand-light-text dark:text-brand-text-light">{t('theme')}</span>
                            <div className="flex justify-center border border-brand-light-border dark:border-brand-border rounded-full p-1 bg-brand-light dark:bg-brand-dark">
                                <button onClick={() => handleSetTheme('light')} className={`px-4 py-1 rounded-full font-semibold transition-colors text-sm ${theme === 'light' ? 'bg-brand-accent text-brand-button-text' : 'text-brand-light-text/70 dark:text-brand-text-light/70'}`}>{t('light')}</button>
                                <button onClick={() => handleSetTheme('dark')} className={`px-4 py-1 rounded-full font-semibold transition-colors text-sm ${theme === 'dark' ? 'bg-brand-accent text-brand-button-text' : 'text-brand-light-text/70 dark:text-brand-text-light/70'}`}>{t('dark')}</button>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="divide-y divide-brand-light-border dark:divide-brand-border">
                        <button onClick={() => handleNavigate(Page.PRIVACY_POLICY)} className="flex items-center w-full p-4 text-left rtl:text-right hover:bg-brand-accent/5 transition-colors rounded-t-lg">
                            <div className="w-8 h-8 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 flex items-center justify-center text-brand-accent"><PolicyIcon /></div>
                            <span className="flex-grow text-lg font-medium text-brand-light-text dark:text-brand-text-light">{t('privacyPolicy')}</span>
                            <ChevronRightIcon />
                        </button>
                        <button onClick={() => handleNavigate(Page.TERMS_CONDITIONS)} className="flex items-center w-full p-4 text-left rtl:text-right hover:bg-brand-accent/5 transition-colors">
                            <div className="w-8 h-8 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 flex items-center justify-center text-brand-accent"><TermsIcon /></div>
                            <span className="flex-grow text-lg font-medium text-brand-light-text dark:text-brand-text-light">{t('termsAndConditions')}</span>
                            <ChevronRightIcon />
                        </button>
                        <button onClick={() => handleNavigate(Page.HELP_FAQ)} className="flex items-center w-full p-4 text-left rtl:text-right hover:bg-brand-accent/5 transition-colors rounded-b-lg">
                            <div className="w-8 h-8 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 flex items-center justify-center text-brand-accent"><HelpIcon /></div>
                            <span className="flex-grow text-lg font-medium text-brand-light-text dark:text-brand-text-light">{t('helpFAQ')}</span>
                            <ChevronRightIcon />
                        </button>
                    </div>
                </Card>
                
                <Card>
                     <div className="divide-y divide-brand-light-border dark:divide-brand-border">
                        <button onClick={handleRateApp} className="flex items-center w-full p-4 text-left rtl:text-right hover:bg-brand-accent/5 transition-colors rounded-t-lg">
                            <div className="w-8 h-8 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 flex items-center justify-center text-brand-accent"><StarIcon /></div>
                            <span className="flex-grow text-lg font-medium text-brand-light-text dark:text-brand-text-light">{t('rateApp')}</span>
                            <ChevronRightIcon />
                        </button>
                        <button onClick={handleContact} className="flex items-center w-full p-4 text-left rtl:text-right hover:bg-brand-accent/5 transition-colors rounded-b-lg">
                            <div className="w-8 h-8 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 flex items-center justify-center text-brand-accent"><ContactIcon /></div>
                            <span className="flex-grow text-lg font-medium text-brand-light-text dark:text-brand-text-light">{t('contactUs')}</span>
                            <ChevronRightIcon />
                        </button>
                    </div>
                </Card>

                <p className="text-center text-sm text-brand-light-text/50 dark:text-brand-text-light/50">{t('versionInfo')} 1.0.0</p>

                <div className="mt-8 text-center">
                    <Button onClick={() => setPage(Page.HOME)} variant="secondary">
                        {t('goHome')}
                    </Button>
                </div>
            </div>

            <LanguagePickerModal
                isOpen={isLanguageModalOpen}
                onClose={() => setIsLanguageModalOpen(false)}
            />
        </div>
    );
};

export default SettingsPage;

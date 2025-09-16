import React from 'react';
import { Page } from '../types';
import { useSettings } from '../hooks/useSettings';
import Button from './common/Button';
import Card from './common/Card';

interface SettingsPageProps {
  setPage: (page: Page) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ setPage }) => {
    const { theme, setTheme, language, setLanguage, t } = useSettings();

    const handleShare = async () => {
        // NOTE: This is a placeholder link. Replace 'com.falkom.app' with your actual package name once the app is published on the Google Play Store.
        const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.falkom.app';
        
        const shareData = {
            title: t('appName'),
            text: t('shareMessage'),
            url: googlePlayLink,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that do not support the Web Share API
                await navigator.clipboard.writeText(googlePlayLink);
                alert("App link copied to clipboard!");
            }
        } catch (error) {
            console.error('Error sharing:', error);
            alert("Could not share the app.");
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center h-screen justify-center animate-fade-in box-border pb-28">
            <Card className="w-full max-w-lg text-center">
                <h2 className="text-3xl font-bold mb-6 text-violet-700 dark:text-violet-300">{t('settings')}</h2>

                <div className="space-y-6">
                    {/* Language Setting */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-violet-300">{t('language')}</h3>
                        <div className="flex justify-center border border-violet-500/30 rounded-full p-1 max-w-xs mx-auto bg-black/10 dark:bg-white/5">
                            <button onClick={() => setLanguage('en')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors text-sm ${language === 'en' ? 'bg-violet-500 text-white' : 'text-violet-700 dark:text-violet-300'}`}>
                                {t('english')}
                            </button>
                             <button onClick={() => setLanguage('fr')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors text-sm ${language === 'fr' ? 'bg-violet-500 text-white' : 'text-violet-700 dark:text-violet-300'}`}>
                                {t('french')}
                            </button>
                            <button onClick={() => setLanguage('ar')} className={`w-1/3 p-2 rounded-full font-semibold transition-colors text-sm ${language === 'ar' ? 'bg-violet-500 text-white' : 'text-violet-700 dark:text-violet-300'}`}>
                                {t('arabic')}
                            </button>
                        </div>
                    </div>

                    {/* Theme Setting */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-violet-300">{t('theme')}</h3>
                         <div className="flex justify-center border border-violet-500/30 rounded-full p-1 max-w-xs mx-auto bg-black/10 dark:bg-white/5">
                            <button onClick={() => setTheme('light')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-violet-500 text-white' : 'text-violet-700 dark:text-violet-300'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                {t('light')}
                            </button>
                            <button onClick={() => setTheme('dark')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-violet-500 text-white' : 'text-violet-700 dark:text-violet-300'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                                {t('dark')}
                            </button>
                        </div>
                    </div>

                    {/* Share Button */}
                    <div>
                         <Button onClick={handleShare} className="w-full max-w-xs mx-auto">
                            {t('shareApp')}
                        </Button>
                    </div>

                    {/* About App Button */}
                    <div>
                         <Button onClick={() => setPage(Page.ABOUT)} className="w-full max-w-xs mx-auto">
                            {t('aboutAppTitle')}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;
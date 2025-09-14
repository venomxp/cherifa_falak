import React from 'react';
import { Page } from '../types';
import { useSettings } from '../hooks/useSettings';
import Button from './common/Button';
import Card from './common/Card';
import Logo from './common/Logo';

interface SettingsPageProps {
  setPage: (page: Page) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ setPage }) => {
    const { theme, setTheme, language, setLanguage, t } = useSettings();

    const handleShare = async () => {
        const shareData = {
            title: t('appName'),
            text: t('shareMessage'),
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that do not support the Web Share API
                await navigator.clipboard.writeText(window.location.href);
                alert("App link copied to clipboard!");
            }
        } catch (error) {
            console.error('Error sharing:', error);
            alert("Could not share the app.");
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in">
            <Logo className="mb-8" setPage={setPage} />
            <Card className="w-full max-w-lg text-center">
                <h2 className="text-3xl font-bold mb-6 text-amber-700 dark:text-amber-300">{t('settings')}</h2>

                <div className="space-y-6">
                    {/* Language Setting */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-amber-200">{t('language')}</h3>
                        <div className="flex justify-center border border-amber-500/30 rounded-full p-1 max-w-xs mx-auto bg-black/10 dark:bg-black/20">
                            <button onClick={() => setLanguage('en')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors ${language === 'en' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-700 dark:text-amber-200'}`}>
                                {t('english')}
                            </button>
                            <button onClick={() => setLanguage('ar')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors ${language === 'ar' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-700 dark:text-amber-200'}`}>
                                {t('arabic')}
                            </button>
                        </div>
                    </div>

                    {/* Theme Setting */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-amber-200">{t('theme')}</h3>
                         <div className="flex justify-center border border-amber-500/30 rounded-full p-1 max-w-xs mx-auto bg-black/10 dark:bg-black/20">
                            <button onClick={() => setTheme('light')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors ${theme === 'light' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-700 dark:text-amber-200'}`}>
                                {t('light')}
                            </button>
                            <button onClick={() => setTheme('dark')} className={`w-1/2 p-2 rounded-full font-semibold transition-colors ${theme === 'dark' ? 'bg-amber-400 text-[#221E1F]' : 'text-amber-700 dark:text-amber-200'}`}>
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
                </div>
            </Card>
            <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
                {t('goHome')}
            </Button>
        </div>
    );
};

export default SettingsPage;

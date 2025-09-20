import React, { useState } from 'react';
import { Page } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import { getAvatarById } from '../assets/avatars.ts';
import AvatarPickerModal from './common/AvatarPickerModal.tsx';
import DatePicker from './common/DatePicker.tsx';
import SettingsIcon from './common/SettingsIcon.tsx';

// Icons for inputs
const UserIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
const CalendarIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-9 11.25h2.25" />
  </svg>
);
const EditIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);


interface WelcomeProfilePageProps {
  setPage: (page: Page) => void;
}

const WelcomeProfilePage: React.FC<WelcomeProfilePageProps> = ({ setPage }) => {
    const { t, setUserName, setUserDob, profilePic, setProfilePic, language, theme } = useSettings();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [isAvatarPickerOpen, setAvatarPickerOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [error, setError] = useState('');

    const handleContinue = () => {
        setError('');
        if (!name.trim()) {
            setError(t('errorEnterName'));
            return;
        }
        
        setUserName(name);
        setUserDob(dob);
        setPage(Page.HOME);
    };

    const formatDateForDisplay = (dateString: string, lang: string, placeholder: string): string => {
      if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return placeholder;
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const AvatarComponent = getAvatarById(profilePic);

    const lightBgUrl = 'https://i.postimg.cc/9FcfPsdB/Untitled-design-7.png';
    const darkBgUrl = 'https://i.postimg.cc/1RGtqyqt/Untitled-design-8.png';

    return (
        <div 
            className="relative flex justify-center items-start min-h-screen p-4 box-border animate-fade-in"
            style={{ 
                backgroundImage: `url(${theme === 'dark' ? darkBgUrl : lightBgUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center top',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="relative z-10 w-full max-w-sm mt-52 bg-white/60 dark:bg-black/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30 dark:border-white/20 shadow-2xl">
                
                <div className="w-full flex flex-col items-center space-y-6">
                    <div className="text-center w-full">
                        <div className="flex justify-between items-center">
                            <span className="w-8 h-8" aria-hidden="true"></span>
                            <h1 className="text-3xl font-logo-en font-bold text-slate-800 dark:text-white drop-shadow-lg tracking-wider">
                                {t('welcomeProfileTitle')}
                            </h1>
                            <SettingsIcon setPage={setPage} className="!relative !p-0 !top-auto !right-auto !left-auto text-slate-600/70 dark:!text-white/70 hover:!bg-black/10 dark:hover:!bg-white/10" />
                        </div>
                        <p className="text-md mt-2 text-slate-700/80 dark:text-white/80 max-w-xs mx-auto drop-shadow-md">{t('welcomeProfileSubtitle')}</p>
                    </div>

                    <button 
                        onClick={() => setAvatarPickerOpen(true)} 
                        className="w-28 h-28 rounded-full bg-slate-200/50 dark:bg-black/30 backdrop-blur-sm p-1 ring-2 ring-slate-300 dark:ring-white/20 shadow-lg flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-violet-400/50 transition-transform transform hover:scale-105"
                        aria-label={t('chooseYourSymbol')}
                    >
                        <div className="relative w-full h-full bg-brand-light dark:bg-brand-light-dark/50 rounded-full flex items-center justify-center overflow-hidden">
                            {AvatarComponent ? (
                                <AvatarComponent className="w-full h-full" />
                            ) : (
                                <UserIcon className="w-16 h-16 text-slate-500/70 dark:text-white/70" />
                            )}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <EditIcon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </button>
                    
                    <div className="w-full space-y-4">
                        <div className="relative">
                            <UserIcon className="absolute top-1/2 left-4 rtl:left-auto rtl:right-4 -translate-y-1/2 w-5 h-5 text-slate-500/80 dark:text-white/60 pointer-events-none" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t('userName')}
                                className="w-full text-lg bg-white/50 dark:bg-black/30 backdrop-blur-sm border-2 border-transparent focus:border-violet-400 rounded-full focus:ring-0 transition-all py-3 pl-12 rtl:pl-6 rtl:pr-12 text-slate-800 dark:text-white placeholder:text-slate-500/80 dark:placeholder:text-white/60"
                                aria-label={t('userName')}
                            />
                        </div>
                        <div className="relative">
                            <CalendarIcon className="absolute top-1/2 left-4 rtl:left-auto rtl:right-4 -translate-y-1/2 w-5 h-5 text-slate-500/80 dark:text-white/60 pointer-events-none" />
                            <button
                                onClick={() => setIsDatePickerOpen(true)}
                                className="w-full text-lg bg-white/50 dark:bg-black/30 backdrop-blur-sm border-2 border-transparent focus:border-violet-400 rounded-full focus:ring-0 transition-all py-3 pl-12 rtl:pl-6 rtl:pr-12 text-left rtl:text-right text-slate-800/80 dark:text-white/80"
                                aria-label={t('userDob')}
                            >
                                {formatDateForDisplay(dob, language, t('userDob'))}
                            </button>
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}
                     
                     <button 
                        onClick={handleContinue} 
                        disabled={!name.trim()}
                        className="w-full text-xl py-4 rounded-full font-bold bg-violet-900 text-white hover:bg-violet-950 dark:bg-violet-900 dark:hover:bg-violet-800 transition-all transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-900/30 dark:shadow-violet-900/40 focus:outline-none focus:ring-4 focus:ring-violet-700/50"
                      >
                         {t('startYourJourney')}
                     </button>
                </div>

                <DatePicker
                  isOpen={isDatePickerOpen}
                  onClose={() => setIsDatePickerOpen(false)}
                  onSet={(date) => { setDob(date); setIsDatePickerOpen(false); }}
                  onClear={() => { setDob(''); setIsDatePickerOpen(false); }}
                  initialDate={dob}
                />
                <AvatarPickerModal
                    isOpen={isAvatarPickerOpen}
                    onClose={() => setAvatarPickerOpen(false)}
                    onSelectAvatar={(id) => {
                        setProfilePic(id);
                        setAvatarPickerOpen(false);
                    }}
                />
            </div>
        </div>
    );
};

export default WelcomeProfilePage;
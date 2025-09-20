import React, { useState, useEffect } from 'react';
import { Page } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import DatePicker from './common/DatePicker.tsx';
import { getAvatarById } from '../assets/avatars.ts';
import AvatarPickerModal from './common/AvatarPickerModal.tsx';


interface ProfilePageProps {
  setPage: (page: Page) => void;
}

// --- SVG Icons ---
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
const HistoryIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const LogoutIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
   </svg>
);
const ChevronRightIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
);
const EditIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ setPage }) => {
    const { t, userName, setUserName, userDob, setUserDob, profilePic, setProfilePic, clearReadingHistory, language } = useSettings();
    const [isAvatarPickerOpen, setAvatarPickerOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [localName, setLocalName] = useState(userName);
    const [localDob, setLocalDob] = useState(userDob);
    const [isSaved, setIsSaved] = useState(false);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        setLocalName(userName);
        setLocalDob(userDob);
    }, [userName, userDob]);

    const handleLogout = () => {
        setUserName('');
        setUserDob('');
        setProfilePic(null);
        clearReadingHistory();
    };

    const handleSave = () => {
        setValidationError('');
        if (!localName.trim()) {
            setValidationError(t('errorEnterName'));
            return;
        }

        setUserName(localName);
        setUserDob(localDob);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const formatDateForDisplay = (dateString: string, lang: string, placeholder: string): string => {
      if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return placeholder;
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
    };
    
    const AvatarComponent = getAvatarById(profilePic);
    const hasChanges = localName !== userName || localDob !== userDob;

    return (
        <div className="flex flex-col items-center flex-grow animate-fade-in p-4 box-border pb-24">
            <div className="w-full max-w-md flex flex-col items-center justify-start pt-4 flex-grow space-y-6">
                
                <button 
                    onClick={() => setAvatarPickerOpen(true)} 
                    className="w-28 h-28 rounded-full bg-slate-200/50 dark:bg-black/30 p-1 ring-2 ring-slate-300 dark:ring-white/20 shadow-lg flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-violet-400/50 transition-transform transform hover:scale-105"
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

                <h2 className="text-4xl font-bold -mt-2 text-brand-light-text dark:text-brand-text-light">{localName || t('profile')}</h2>
                
                <Card className="w-full p-4">
                     <div className="space-y-6">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-grow">
                                <label htmlFor="userNameInput" className="block text-sm font-semibold text-brand-light-text/70 dark:text-brand-text-light/70">{t('userName')}</label>
                                <input
                                    id="userNameInput"
                                    type="text"
                                    value={localName}
                                    onChange={(e) => setLocalName(e.target.value)}
                                    placeholder={t('firstName')}
                                    className="w-full text-lg bg-slate-100 dark:bg-slate-800 rounded-lg p-3 mt-1"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           <div className="flex-grow">
                                <label htmlFor="userDobInput" className="block text-sm font-semibold text-brand-light-text/70 dark:text-brand-text-light/70">{t('userDob')}</label>
                                <button
                                    id="userDobInput"
                                    onClick={() => setIsDatePickerOpen(true)}
                                    className="w-full text-lg bg-slate-100 dark:bg-slate-800 rounded-lg p-3 mt-1 text-left rtl:text-right"
                                >
                                  {formatDateForDisplay(localDob, language, t('selectDate'))}
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                {validationError && <p className="text-red-400 text-center text-sm -mt-2">{validationError}</p>}
                
                <Button onClick={handleSave} variant="secondary" disabled={!hasChanges || isSaved} className="w-full">
                    {isSaved ? t('profileSaved') : t('saveProfile')}
                </Button>

                <button
                    onClick={() => setPage(Page.READING_HISTORY)}
                    className="group w-full p-6 rounded-2xl flex items-center gap-6 text-left rtl:text-right relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-brand-accent/50 bg-brand-light-card dark:bg-brand-light-dark border border-brand-light-border dark:border-brand-border shadow-lg"
                >
                    <div className="absolute -top-10 -right-10 rtl:-left-10 rtl:-right-auto w-24 h-24 bg-brand-accent/20 dark:bg-brand-accent/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center text-brand-accent">
                        <HistoryIcon className="w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="relative z-10 flex-grow">
                        <h3 className="text-xl font-bold text-brand-light-text dark:text-brand-text-light">{t('readingHistoryTitle')}</h3>
                        <p className="text-md text-brand-light-text/70 dark:text-brand-text-light/70 mt-1">{t('readingHistoryCardBody')}</p>
                    </div>
                    <div className="relative z-10 text-brand-light-text/40 dark:text-brand-text-light/40 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        <ChevronRightIcon className="w-6 h-6" />
                    </div>
                </button>
                
                <div className="w-full space-y-3 pt-4">
                    <Button onClick={handleLogout} variant="primary" className="w-full flex items-center justify-center gap-2">
                        <LogoutIcon />
                        {t('logout')}
                    </Button>
                    <Button onClick={() => setPage(Page.HOME)} variant="primary" className="w-full">
                        {t('goHome')}
                    </Button>
                </div>
            </div>

            <AvatarPickerModal
                isOpen={isAvatarPickerOpen}
                onClose={() => setAvatarPickerOpen(false)}
                onSelectAvatar={(id) => {
                    setProfilePic(id);
                    setAvatarPickerOpen(false);
                }}
            />
            <DatePicker
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onSet={(date) => { setLocalDob(date); setIsDatePickerOpen(false); }}
              onClear={() => { setLocalDob(''); setIsDatePickerOpen(false); }}
              initialDate={localDob}
            />
        </div>
    );
};

export default ProfilePage;
import React, { useState } from 'react';
import { Page } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import Button from './common/Button.tsx';
import { getAvatarById } from '../assets/avatars.ts';
import AvatarPickerModal from './common/AvatarPickerModal.tsx';
import DatePicker from './common/DatePicker.tsx';
import { validateName } from '../services/geminiService.ts';
import Logo from './common/Logo.tsx';

// Icons for inputs
const UserIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
const SettingsNavIcon = ({ className }: { className: string }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );


interface WelcomeProfilePageProps {
  setPage: (page: Page) => void;
}

const WelcomeProfilePage: React.FC<WelcomeProfilePageProps> = ({ setPage }) => {
    const { t, setUserName, setUserDob, profilePic, setProfilePic, language } = useSettings();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [isAvatarPickerOpen, setAvatarPickerOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState('');

    const backgroundImageUrl = "https://i.imgur.com/Qoxj4wA.png";

    const handleContinue = async () => {
        setError('');
        if (!name.trim()) {
            setError(t('errorEnterName'));
            return;
        }
        
        setIsValidating(true);
        const result = await validateName(name);

        if (!result.isValid) {
            setError(result.suggestion 
                ? t('errorInvalidNameWithSuggestion', { suggestion: result.suggestion }) 
                : t('errorInvalidName')
            );
            setIsValidating(false);
            return;
        }

        setUserName(name);
        setUserDob(dob);
        setIsValidating(false);
        setPage(Page.HOME);
    };

    const formatDateForDisplay = (dateString: string, lang: string, placeholder: string): string => {
      if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return placeholder;
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const AvatarComponent = getAvatarById(profilePic);

    return (
        <div 
            className="relative flex flex-col items-center justify-between min-h-screen bg-cover bg-center text-white p-4 box-border animate-fade-in"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            {/* Darkening Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-brand-dark"></div>

            <button
              onClick={() => setPage(Page.SETTINGS)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 p-2 rounded-full text-white/80 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={t('settings')}
            >
              <SettingsNavIcon className="w-8 h-8" />
            </button>
            
            {/* Header Content */}
            <div className="relative z-10 flex flex-col items-center text-center pt-16">
                <Logo />
                <h1 className="text-4xl font-bold mt-4 text-white drop-shadow-lg">{t('welcomeProfileTitle')}</h1>
                <p className="text-md mt-2 text-white/80 max-w-xs drop-shadow-md">{t('welcomeProfileSubtitle')}</p>
            </div>

            {/* Form Content */}
            <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center space-y-6 pb-8">
                {/* Avatar */}
                <button 
                    onClick={() => setAvatarPickerOpen(true)} 
                    className="w-32 h-32 rounded-full bg-brand-accent/20 p-1 shadow-lg ring-2 ring-brand-accent/50 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-brand-accent/50 transition-transform transform hover:scale-105"
                    aria-label={t('chooseYourSymbol')}
                >
                    <div className="relative w-full h-full bg-brand-dark rounded-full flex items-center justify-center overflow-hidden">
                        {AvatarComponent ? (
                            <AvatarComponent className="w-full h-full text-brand-accent" />
                        ) : (
                            <UserIcon className="w-20 h-20 text-brand-accent/80" />
                        )}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <EditIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </button>
                
                {/* Form Fields */}
                <div className="w-full space-y-4">
                    <div className="relative">
                        <UserIcon className="absolute top-1/2 left-5 rtl:left-auto rtl:right-5 -translate-y-1/2 w-6 h-6 text-brand-accent/80 pointer-events-none" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('userName')}
                            className="w-full text-lg bg-black/30 backdrop-blur-sm border border-brand-accent/40 rounded-full focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all py-4 pl-14 rtl:pl-6 rtl:pr-14 text-white placeholder:text-white/60"
                            aria-label={t('userName')}
                        />
                    </div>
                    <div className="relative">
                        <CalendarIcon className="absolute top-1/2 left-5 rtl:left-auto rtl:right-5 -translate-y-1/2 w-6 h-6 text-brand-accent/80 pointer-events-none" />
                        <button
                            onClick={() => setIsDatePickerOpen(true)}
                            className="w-full text-lg bg-black/30 backdrop-blur-sm border border-brand-accent/40 rounded-full focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all py-4 pl-14 rtl:pl-6 rtl:pr-14 text-left rtl:text-right text-white/80"
                            aria-label={t('userDob')}
                        >
                            {formatDateForDisplay(dob, language, t('userDob'))}
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button onClick={handleContinue} disabled={isValidating || !name.trim()} className="w-full text-xl py-4">
                    {isValidating ? t('validatingName') : t('saveAndContinue')}
                </Button>
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
    );
};

export default WelcomeProfilePage;

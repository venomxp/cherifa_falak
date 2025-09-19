import React, { useState, useEffect } from 'react';
import { Page, ReadingHistoryItem, ReadingType } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { getAvatarById } from '../assets/avatars.ts';
import AvatarPickerModal from './common/AvatarPickerModal.tsx';
import ReadingViewerModal from './common/ReadingViewerModal.tsx';
import { triggerHapticFeedback } from '../utils/haptics.ts';
import DatePicker from './common/DatePicker.tsx';
import { validateName } from '../services/geminiService.ts';


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
const EditIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);
const TrashIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ setPage }) => {
    const { t, userName, setUserName, userDob, setUserDob, profilePic, setProfilePic, readingHistory, removeReadingFromHistory, clearReadingHistory, language } = useSettings();
    const [isAvatarPickerOpen, setAvatarPickerOpen] = useState(false);
    const [viewingReading, setViewingReading] = useState<ReadingHistoryItem | null>(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // Local state for editing fields, initialized from global context
    const [localName, setLocalName] = useState(userName);
    const [localDob, setLocalDob] = useState(userDob);
    const [isSaved, setIsSaved] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState('');

    // Keep local state in sync with global context (e.g., after logout)
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

    const handleSave = async () => {
        setValidationError('');
        if (!localName.trim()) {
            setValidationError(t('errorEnterName'));
            return;
        }

        setIsValidating(true);
        const result = await validateName(localName);
        setIsValidating(false);

        if (!result.isValid) {
            setValidationError(result.suggestion 
                ? t('errorInvalidNameWithSuggestion', { suggestion: result.suggestion }) 
                : t('errorInvalidName')
            );
            return;
        }

        setUserName(localName);
        setUserDob(localDob);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000); // Show feedback for 2 seconds
    };

    const handleDeleteReading = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        triggerHapticFeedback();
        removeReadingFromHistory(id);
    };

    const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const formatDateForDisplay = (dateString: string, lang: string, placeholder: string): string => {
      if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return placeholder;
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const hasChanges = localName !== userName || localDob !== userDob;
    const AvatarComponent = getAvatarById(profilePic);

    return (
        <div className="flex flex-col items-center flex-grow animate-fade-in p-4 box-border pb-24">
            <div className="w-full max-w-md flex flex-col items-center justify-start pt-4 flex-grow space-y-4">
                
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center w-full pt-4">
                     <div className="relative">
                        <button 
                            onClick={() => setAvatarPickerOpen(true)} 
                            className="w-32 h-32 rounded-full bg-brand-accent p-1 shadow-lg flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
                            aria-label="Change profile symbol"
                        >
                            <div className="relative w-full h-full bg-brand-light-dark rounded-full flex items-center justify-center overflow-hidden">
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
                    </div>
                    {userName && (
                        <h2 className="text-3xl font-bold mt-4 text-brand-light-text dark:text-brand-text-light">{userName}</h2>
                    )}
                </div>

                {/* User Details & Save Button */}
                <div className="w-full space-y-4">
                  <Card className="w-full">
                      <div className="space-y-4">
                          {/* Name Field */}
                          <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-8 text-center"><UserIcon className="w-6 h-6 mx-auto text-brand-accent" /></div>
                              <div className="flex-1">
                                  <label htmlFor="userNameInput" className="block text-sm font-semibold text-brand-accent/80">{t('userName')}</label>
                                  <input
                                      id="userNameInput"
                                      type="text"
                                      value={localName}
                                      onChange={(e) => setLocalName(e.target.value)}
                                      placeholder={t('firstName')}
                                      className="w-full text-lg bg-transparent text-brand-light-text dark:text-white focus:outline-none p-1 -m-1 rounded focus:bg-black/10 dark:focus:bg-brand-dark/50 transition-colors"
                                  />
                              </div>
                          </div>

                          <div className="w-full h-px bg-brand-light-border dark:bg-brand-border"></div>

                          {/* DOB Field */}
                           <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-8 text-center"><CalendarIcon className="w-6 h-6 mx-auto text-brand-accent" /></div>
                              <div className="flex-1">
                                  <label htmlFor="userDobInput" className="block text-sm font-semibold text-brand-accent/80">{t('userDob')}</label>
                                  <button
                                      id="userDobInput"
                                      onClick={() => setIsDatePickerOpen(true)}
                                      className="w-full text-lg bg-transparent text-brand-light-text dark:text-white focus:outline-none p-1 -m-1 rounded focus:bg-black/10 dark:focus:bg-brand-dark/50 transition-colors text-left rtl:text-right"
                                  >
                                    {formatDateForDisplay(localDob, language, t('selectDate'))}
                                  </button>
                              </div>
                          </div>
                      </div>
                  </Card>
                  
                  {validationError && <p className="text-red-400 text-center text-sm">{validationError}</p>}
                  <Button onClick={handleSave} disabled={!hasChanges || isSaved || isValidating} className="w-full">
                     {isValidating ? t('validatingName') : isSaved ? t('profileSaved') : t('saveProfile')}
                  </Button>
                </div>
                
                 {/* Reading History Card */}
                <Card className="w-full">
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <HistoryIcon className="w-8 h-8 text-brand-accent"/>
                            <h3 className="text-xl font-bold text-brand-light-text dark:text-brand-text-light">{t('readingHistoryTitle')}</h3>
                        </div>
                        {readingHistory.length === 0 ? (
                            <p className="text-center text-sm text-brand-light-text/70 dark:text-brand-text-light/70 py-4">{t('readingHistoryBody')}</p>
                        ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {readingHistory.map(reading => (
                                    <div key={reading.id} className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setViewingReading(reading)}
                                            className="flex-grow text-left rtl:text-right p-3 rounded-lg bg-brand-light dark:bg-brand-dark/50 hover:bg-brand-accent/10 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex-grow">
                                                    <p className="font-semibold text-brand-accent">{reading.title}</p>
                                                    <p className="text-xs text-brand-light-text/70 dark:text-brand-text-light/70">{formatDate(reading.date)}</p>
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteReading(e, reading.id)}
                                            className="p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 flex-shrink-0 transition-colors"
                                            aria-label={`Delete reading: ${reading.title}`}
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
                
                {/* Logout Button */}
                <Button onClick={handleLogout} variant="secondary" className="w-full !py-3 font-bold flex items-center justify-center gap-2">
                    <LogoutIcon />
                    {t('logout')}
                </Button>
                <div className="w-full mt-4">
                  <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="w-full">{t('goHome')}</Button>
                </div>

            </div>

            <DatePicker
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onSet={(date) => { setLocalDob(date); setIsDatePickerOpen(false); }}
              onClear={() => { setLocalDob(''); setIsDatePickerOpen(false); }}
              initialDate={localDob}
            />
            <AvatarPickerModal
                isOpen={isAvatarPickerOpen}
                onClose={() => setAvatarPickerOpen(false)}
                onSelectAvatar={(id) => {
                    setProfilePic(id);
                    setAvatarPickerOpen(false);
                }}
            />
            <ReadingViewerModal
                isOpen={!!viewingReading}
                onClose={() => setViewingReading(null)}
                reading={viewingReading}
            />
        </div>
    );
};

export default ProfilePage;
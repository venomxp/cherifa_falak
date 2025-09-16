import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { useSettings } from '../hooks/useSettings';
import Button from './common/Button';
import Card from './common/Card';
import { getAvatarById } from '../assets/avatars';
import AvatarPickerModal from './common/AvatarPickerModal';


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


const ProfilePage: React.FC<ProfilePageProps> = ({ setPage }) => {
    const { t, userName, setUserName, userDob, setUserDob, profilePic, setProfilePic } = useSettings();
    const [isAvatarPickerOpen, setAvatarPickerOpen] = useState(false);

    // Local state for editing fields, initialized from global context
    const [localName, setLocalName] = useState(userName);
    const [localDob, setLocalDob] = useState(userDob);
    const [isSaved, setIsSaved] = useState(false);

    // Keep local state in sync with global context (e.g., after logout)
    useEffect(() => {
        setLocalName(userName);
        setLocalDob(userDob);
    }, [userName, userDob]);

    const handleLogout = () => {
        setUserName('');
        setUserDob('');
        setProfilePic(null);
    };

    const handleSave = () => {
        setUserName(localName);
        setUserDob(localDob);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000); // Show feedback for 2 seconds
    };

    const hasChanges = localName !== userName || localDob !== userDob;
    const AvatarComponent = getAvatarById(profilePic);

    return (
        <div className="flex flex-col items-center min-h-screen animate-fade-in p-4 box-border pb-28">
            <div className="w-full max-w-md flex flex-col items-center justify-center flex-grow space-y-4">
                
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center w-full pt-4">
                     <div className="relative">
                        <button 
                            onClick={() => setAvatarPickerOpen(true)} 
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 p-1 shadow-lg flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-violet-400/50"
                            aria-label="Change profile symbol"
                        >
                            <div className="relative w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                                {AvatarComponent ? (
                                    <AvatarComponent className="w-full h-full p-6 text-violet-600 dark:text-violet-400" />
                                ) : (
                                    <UserIcon className="w-20 h-20 text-violet-500/80 dark:text-violet-400/80" />
                                )}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <EditIcon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </button>
                    </div>
                    {userName && (
                        <h2 className="text-3xl font-bold mt-4 text-slate-800 dark:text-violet-200">{userName}</h2>
                    )}
                </div>

                {/* User Details & Save Button */}
                <div className="w-full space-y-4">
                  <Card className="w-full">
                      <div className="space-y-4">
                          {/* Name Field */}
                          <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-8 text-center"><UserIcon className="w-6 h-6 mx-auto text-violet-500" /></div>
                              <div className="flex-1">
                                  <label htmlFor="userNameInput" className="block text-sm font-semibold text-slate-500 dark:text-violet-300/80">{t('userName')}</label>
                                  <input
                                      id="userNameInput"
                                      type="text"
                                      value={localName}
                                      onChange={(e) => setLocalName(e.target.value)}
                                      placeholder="..."
                                      className="w-full text-lg bg-transparent text-slate-800 dark:text-white focus:outline-none p-1 -m-1 rounded focus:bg-slate-200/50 dark:focus:bg-slate-700/50 transition-colors"
                                  />
                              </div>
                          </div>

                          <div className="w-full h-px bg-slate-300/70 dark:bg-slate-700/70"></div>

                          {/* DOB Field */}
                           <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-8 text-center"><CalendarIcon className="w-6 h-6 mx-auto text-violet-500" /></div>
                              <div className="flex-1">
                                  <label htmlFor="userDobInput" className="block text-sm font-semibold text-slate-500 dark:text-violet-300/80">{t('userDob')}</label>
                                  <input
                                      id="userDobInput"
                                      type="date"
                                      value={localDob}
                                      onChange={(e) => setLocalDob(e.target.value)}
                                      className="w-full text-lg bg-transparent text-slate-800 dark:text-white focus:outline-none p-1 -m-1 rounded dark:[color-scheme:dark] focus:bg-slate-200/50 dark:focus:bg-slate-700/50 transition-colors"
                                  />
                              </div>
                          </div>
                      </div>
                  </Card>
                  
                  <Button onClick={handleSave} disabled={!hasChanges || isSaved} className="w-full">
                     {isSaved ? t('profileSaved') : t('saveProfile')}
                  </Button>
                </div>
                
                {/* Reading History Card */}
                <Card className="text-center flex flex-col items-center p-6 w-full">
                     <HistoryIcon className="w-8 h-8 text-violet-500 mb-2"/>
                     <h3 className="text-lg font-bold text-slate-800 dark:text-violet-200">{t('readingHistoryTitle')}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-400">{t('readingHistoryBody')}</p>
                </Card>
                
                {/* Logout Button */}
                <Button onClick={handleLogout} variant="secondary" className="w-full !py-3 font-bold flex items-center justify-center gap-2">
                    <LogoutIcon />
                    {t('logout')}
                </Button>
            </div>

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

export default ProfilePage;
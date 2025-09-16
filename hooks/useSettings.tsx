import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations } from '../localization/translations';
import { TranslationKey } from '../types';


type Theme = 'light' | 'dark';
type Language = 'ar' | 'en' | 'fr';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, replacements?: { [key: string]: string | number }) => string;
  userName: string;
  setUserName: (name: string) => void;
  userDob: string;
  setUserDob: (dob: string) => void;
  profilePic: string | null;
  setProfilePic: (pic: string | null) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'ar';
  });
  const [userName, setUserNameState] = useState<string>(() => localStorage.getItem('userName') || '');
  const [userDob, setUserDobState] = useState<string>(() => localStorage.getItem('userDob') || '');
  const [profilePic, setProfilePicState] = useState<string | null>(() => localStorage.getItem('profilePic') || null);


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);
  
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('userDob', userDob);
  }, [userDob]);

  const t = useMemo(() => {
    return (key: TranslationKey, replacements?: { [key: string]: string | number }): string => {
        let translation = translations[language][key] || translations['en'][key] || key;
        if (replacements) {
            Object.keys(replacements).forEach(rKey => {
                translation = translation.replace(`{${rKey}}`, String(replacements[rKey]));
            });
        }
        return translation;
    };
  }, [language]);


  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setLanguage = (newLanguage: Language) => setLanguageState(newLanguage);
  const setUserName = (newName: string) => setUserNameState(newName);
  const setUserDob = (newDob: string) => setUserDobState(newDob);
  const setProfilePic = (newPic: string | null) => {
    if (newPic) {
      localStorage.setItem('profilePic', newPic);
    } else {
      localStorage.removeItem('profilePic');
    }
    setProfilePicState(newPic);
  };

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, t, userName, setUserName, userDob, setUserDob, profilePic, setProfilePic }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
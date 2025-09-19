import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations } from '../localization/translations.ts';
import { TranslationKey, ReadingHistoryItem } from '../types.ts';


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
  readingHistory: ReadingHistoryItem[];
  addReadingToHistory: (reading: Omit<ReadingHistoryItem, 'id' | 'date'>) => void;
  removeReadingFromHistory: (id: number) => void;
  clearReadingHistory: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'ar';
  });
  const [userName, setUserNameState] = useState<string>(() => localStorage.getItem('userName') || '');
  const [userDob, setUserDobState] = useState<string>(() => localStorage.getItem('userDob') || '');
  const [profilePic, setProfilePicState] = useState<string | null>(() => localStorage.getItem('profilePic') || null);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(() => {
    try {
      const savedHistory = localStorage.getItem('readingHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to parse reading history from localStorage", error);
      return [];
    }
  });


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

  const addReadingToHistory = useMemo(() => (reading: Omit<ReadingHistoryItem, 'id' | 'date'>) => {
    // Only add to history if a user has created a profile by saving a name.
    const savedUserName = localStorage.getItem('userName');
    if (!savedUserName) {
      console.log("Profile not created (no name saved). Reading will not be added to history.");
      return;
    }

    const newReading: ReadingHistoryItem = {
      ...reading,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setReadingHistory(prevHistory => {
      const updatedHistory = [newReading, ...prevHistory].slice(0, 50); // Keep latest 50 readings
      localStorage.setItem('readingHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);
  
  const removeReadingFromHistory = useMemo(() => (idToRemove: number) => {
    setReadingHistory(prevHistory => {
      const updatedHistory = prevHistory.filter(item => item.id !== idToRemove);
      localStorage.setItem('readingHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);


  const clearReadingHistory = () => {
    setReadingHistory([]);
    localStorage.removeItem('readingHistory');
  };


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
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, t, userName, setUserName, userDob, setUserDob, profilePic, setProfilePic, readingHistory, addReadingToHistory, removeReadingFromHistory, clearReadingHistory }}>
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
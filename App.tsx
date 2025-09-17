import React, { useState, useEffect } from 'react';
import { Page } from './types';
import SplashScreen from './components/SplashScreen';
import HomePage from './components/HomePage';
import HoroscopePage from './components/HoroscopePage';
import CompatibilityPage from './components/CompatibilityPage';
import NumerologyPage from './components/NumerologyPage';
import TarotReadingPage from './components/TarotReadingPage';
import PrivateReadingPage from './components/PrivateReadingPage';
import SettingsPage from './components/SettingsPage';
import FalkLyomWelcomePage from './components/FalkLyomWelcomePage';
import FalkLyomGenderPage from './components/FalkLyomGenderPage';
import FalkLyomSkinTonePage from './components/FalkLyomSkinTonePage';
import FalkLyomCategoryPage from './components/FalkLyomCategoryPage';
import FalkLyomResultPage from './components/FalkLyomResultPage';
import BottomNavBar from './components/common/BottomNavBar';
import ProfilePage from './components/ProfilePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import HelpFAQPage from './components/HelpFAQPage';
import { useSettings } from './hooks/useSettings';
import { scheduleDailyNotification } from './services/notificationService';

const App: React.FC = () => {
  // Use a state for the current page, starting with the splash screen
  const [page, setPage] = useState<Page>(Page.SPLASH);
  const [falkGender, setFalkGender] = useState<string | null>(null);
  const [falkSkinTone, setFalkSkinTone] = useState<string | null>(null);
  const [falkCategory, setFalkCategory] = useState<string | null>(null);
  const { language } = useSettings();

  // Effect to automatically transition from splash to home screen after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(Page.HOME);
    }, 4000); // Extended splash screen duration for the new animation

    return () => clearTimeout(timer);
  }, []);

  // Effect to ensure daily notification is scheduled on app load if enabled
  useEffect(() => {
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    if (notificationsEnabled) {
      // We schedule on every load to ensure the timer is active.
      // The scheduler function itself prevents duplicates.
      scheduleDailyNotification();
    }
  }, []); // Runs once on app mount


  // Effect to scroll to the top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Function to render the correct page based on the current state
  const renderPage = () => {
    switch (page) {
      case Page.SPLASH:
        return <SplashScreen />;
      case Page.HOME:
        return <HomePage setPage={setPage} />;
      case Page.TAROT:
        return <TarotReadingPage setPage={setPage} />;
      case Page.HOROSCOPE:
        return <HoroscopePage setPage={setPage} />;
      case Page.NUMEROLOGY:
        return <NumerologyPage setPage={setPage} />;
      case Page.COMPATIBILITY:
        return <CompatibilityPage setPage={setPage} />;
      case Page.PRIVATE_READING:
        return <PrivateReadingPage setPage={setPage} />;
      case Page.SETTINGS:
        return <SettingsPage setPage={setPage} />;
      case Page.PROFILE:
        return <ProfilePage setPage={setPage} />;
      case Page.FALK_LYOM_WELCOME:
        return <FalkLyomWelcomePage setPage={setPage} />;
      case Page.FALK_LYOM_GENDER:
        return <FalkLyomGenderPage setPage={setPage} setFalkGender={setFalkGender} />;
      case Page.FALK_LYOM_SKIN_TONE:
        return <FalkLyomSkinTonePage setPage={setPage} setFalkSkinTone={setFalkSkinTone} gender={falkGender!} />;
      case Page.FALK_LYOM_CATEGORY:
        return <FalkLyomCategoryPage setPage={setPage} setFalkCategory={setFalkCategory} />;
      case Page.FALK_LYOM_RESULT:
        return <FalkLyomResultPage setPage={setPage} gender={falkGender!} skinTone={falkSkinTone!} category={falkCategory!} />;
      case Page.PRIVACY_POLICY:
        return <PrivacyPolicyPage setPage={setPage} />;
      case Page.TERMS_CONDITIONS:
        return <TermsConditionsPage setPage={setPage} />;
      case Page.HELP_FAQ:
        return <HelpFAQPage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  const showNavBar = page !== Page.SPLASH;

  return (
    <div>
      <main className="w-full">{renderPage()}</main>
      {showNavBar && <BottomNavBar currentPage={page} setPage={setPage} />}
    </div>
  );
};

export default App;
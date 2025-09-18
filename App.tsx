import React, { useState, useEffect } from 'react';
import { Page, pageToPath, pathToPage } from './types';
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
import TopBar from './components/common/TopBar';
import SideNavMenu from './components/common/SideNavMenu';
import ProfilePage from './components/ProfilePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import HelpFAQPage from './components/HelpFAQPage';
import { useSettings } from './hooks/useSettings';
import Spinner from './components/common/Spinner';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The current page is now derived from the URL hash.
  const [page, setPage] = useState<Page>(() => {
    const path = window.location.hash.slice(1) || '/';
    return pathToPage[path] ?? Page.HOME;
  });

  const [falkGender, setFalkGender] = useState<string | null>(null);
  const [falkSkinTone, setFalkSkinTone] = useState<string | null>(null);
  const [falkCategory, setFalkCategory] = useState<string | null>(null);
  const { language } = useSettings();

  // Navigation function that updates the URL hash.
  const navigate = (newPage: Page) => {
    const newPath = pageToPath[newPage];
    if (window.location.hash !== '#' + newPath) {
      window.location.hash = newPath;
    }
  };

  // Effect to hide the splash screen after a delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Effect to listen for URL hash changes and update the page state.
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1) || '/';
      const newPage = pathToPage[path] ?? Page.HOME;
      if (page !== newPage) {
        setPage(newPage);
      }
    };
    
    handleHashChange(); // Sync on initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [page]);

  // Effect to scroll to the top whenever the page changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Effect to prevent scrolling when the splash screen or menu is open.
  useEffect(() => {
    if (showSplash || isMenuOpen) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden');
    };
  }, [showSplash, isMenuOpen]);

  // All pages now display the top navigation bar for consistency.
  const pagesWithoutTopBar: Page[] = [];

  // Function to render the correct page based on the current state
  const renderPage = () => {
    if (showSplash) {
      return <SplashScreen />;
    }

    switch (page) {
      case Page.HOME:
        return <HomePage setPage={navigate} />;
      case Page.TAROT:
        return <TarotReadingPage page={page} setPage={navigate} />;
      case Page.HOROSCOPE:
        return <HoroscopePage page={page} setPage={navigate} />;
      case Page.NUMEROLOGY:
        return <NumerologyPage page={page} setPage={navigate} />;
      case Page.COMPATIBILITY:
        return <CompatibilityPage page={page} setPage={navigate} />;
      case Page.PRIVATE_READING:
        return <PrivateReadingPage setPage={navigate} />;
      case Page.SETTINGS:
        return <SettingsPage setPage={navigate} />;
      case Page.PROFILE:
        return <ProfilePage setPage={navigate} />;
      case Page.FALK_LYOM_WELCOME:
        return <FalkLyomWelcomePage setPage={navigate} />;
      case Page.FALK_LYOM_GENDER:
        return <FalkLyomGenderPage setPage={navigate} setFalkGender={setFalkGender} />;
      case Page.FALK_LYOM_SKIN_TONE:
        if (!falkGender) {
          navigate(Page.FALK_LYOM_GENDER);
          return <Spinner />;
        }
        return <FalkLyomSkinTonePage setPage={navigate} setFalkSkinTone={setFalkSkinTone} gender={falkGender} />;
      case Page.FALK_LYOM_CATEGORY:
        if (!falkSkinTone) {
          navigate(Page.FALK_LYOM_SKIN_TONE);
          return <Spinner />;
        }
        return <FalkLyomCategoryPage setPage={navigate} setFalkCategory={setFalkCategory} />;
      case Page.FALK_LYOM_RESULT:
        if (!falkCategory) {
          navigate(Page.FALK_LYOM_CATEGORY);
          return <Spinner />;
        }
        return <FalkLyomResultPage page={page} setPage={navigate} gender={falkGender!} skinTone={falkSkinTone!} category={falkCategory!} />;
      case Page.PRIVACY_POLICY:
        return <PrivacyPolicyPage page={page} setPage={navigate} />;
      case Page.TERMS_CONDITIONS:
        return <TermsConditionsPage page={page} setPage={navigate} />;
      case Page.HELP_FAQ:
        return <HelpFAQPage page={page} setPage={navigate} />;
      default:
        navigate(Page.HOME);
        return <Spinner />;
    }
  };
  
  const showTopBar = !showSplash && !pagesWithoutTopBar.includes(page);

  return (
    <div className={`${showTopBar ? 'pt-16' : ''} min-h-screen flex flex-col`}>
      {showTopBar && <TopBar toggleMenu={() => setIsMenuOpen(true)} setPage={navigate} />}
      <SideNavMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} currentPage={page} setPage={navigate} />
      <main className="w-full flex-grow flex flex-col">{renderPage()}</main>
    </div>
  );
};

export default App;
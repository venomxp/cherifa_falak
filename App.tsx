import React, { useState, useEffect } from 'react';
import { Page, pageToPath, pathToPage } from './types.ts';
import SplashScreen from './components/SplashScreen.tsx';
import HomePage from './components/HomePage.tsx';
import HoroscopePage from './components/HoroscopePage.tsx';
import CompatibilityPage from './components/CompatibilityPage.tsx';
import NumerologyPage from './components/NumerologyPage.tsx';
import TarotReadingPage from './components/TarotReadingPage.tsx';
import PrivateReadingPage from './components/PrivateReadingPage.tsx';
import SettingsPage from './components/SettingsPage.tsx';
import FalkLyomWelcomePage from './components/FalkLyomWelcomePage.tsx';
import FalkLyomGenderPage from './components/FalkLyomGenderPage.tsx';
import FalkLyomSkinTonePage from './components/FalkLyomSkinTonePage.tsx';
import FalkLyomCategoryPage from './components/FalkLyomCategoryPage.tsx';
import FalkLyomResultPage from './components/FalkLyomResultPage.tsx';
import TopBar from './components/common/TopBar.tsx';
import SideNavMenu from './components/common/SideNavMenu.tsx';
import ProfilePage from './components/ProfilePage.tsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.tsx';
import TermsConditionsPage from './components/TermsConditionsPage.tsx';
import HelpFAQPage from './components/HelpFAQPage.tsx';
import { useSettings } from './hooks/useSettings.tsx';
import Spinner from './components/common/Spinner.tsx';
import TaleePage from './components/TaleePage.tsx';
import GematriaPage from './components/GematriaPage.tsx';
import WelcomeProfilePage from './components/WelcomeProfilePage.tsx';
import ReadingHistoryPage from './components/ReadingHistoryPage.tsx';
import { preloadImages } from './utils/preload.ts';
import { CRITICAL_IMAGE_URLS } from './constants.ts';

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
  const { language, userName } = useSettings();

  // Navigation function that updates the URL hash.
  const navigate = (newPage: Page) => {
    const newPath = pageToPath[newPage];
    const currentPath = window.location.hash.slice(1) || '/';

    // No need to navigate if we're already there.
    if (newPath === currentPath) {
      return;
    }
    
    // Always use hash assignment for navigation. This is safer in the sandboxed
    // environment and avoids the "refused to connect" error, at the cost of
    // creating a history entry for every navigation.
    window.location.hash = newPath;
  };
  
  // Function to go back in browser history
  const goBack = () => {
    window.history.back();
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

  // Effect to preload critical images for a smoother experience.
  useEffect(() => {
    preloadImages(CRITICAL_IMAGE_URLS);
  }, []);

  // All pages now display the top navigation bar for consistency.
  const pagesWithoutTopBar: Page[] = [Page.WELCOME_PROFILE];

  // Function to render the correct page based on the current state
  const renderPage = () => {
    if (showSplash) {
      return <SplashScreen />;
    }

    const preProfileAllowedPages = [
        Page.WELCOME_PROFILE,
        Page.SETTINGS,
        Page.PRIVACY_POLICY,
        Page.TERMS_CONDITIONS,
        Page.HELP_FAQ,
    ];

    // Gatekeeping logic:
    // If no profile exists, only allow access to the welcome page and settings-related pages.
    // Otherwise, redirect to the welcome page.
    if (!userName && !preProfileAllowedPages.includes(page)) {
        navigate(Page.WELCOME_PROFILE);
        return <Spinner />;
    }

    // If a profile exists and the user tries to navigate to the welcome page, redirect them to home.
    if (userName && page === Page.WELCOME_PROFILE) {
        navigate(Page.HOME);
        return <Spinner />;
    }

    switch (page) {
      case Page.HOME:
        return <HomePage setPage={navigate} />;
      case Page.WELCOME_PROFILE:
        return <WelcomeProfilePage setPage={navigate} />;
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
       case Page.READING_HISTORY:
        return <ReadingHistoryPage setPage={navigate} goBack={() => navigate(Page.PROFILE)} />;
      case Page.FALK_LYOM_WELCOME:
        return <FalkLyomWelcomePage setPage={navigate} />;
      case Page.FALK_LYOM_GENDER:
        return <FalkLyomGenderPage setPage={navigate} setFalkGender={setFalkGender} goBack={() => navigate(Page.FALK_LYOM_WELCOME)} />;
      case Page.FALK_LYOM_SKIN_TONE:
        if (!falkGender) {
          navigate(Page.FALK_LYOM_GENDER);
          return <Spinner />;
        }
        return <FalkLyomSkinTonePage setPage={navigate} setFalkSkinTone={setFalkSkinTone} gender={falkGender} goBack={() => navigate(Page.FALK_LYOM_GENDER)} />;
      case Page.FALK_LYOM_CATEGORY:
        if (!falkSkinTone) {
          navigate(Page.FALK_LYOM_SKIN_TONE);
          return <Spinner />;
        }
        return <FalkLyomCategoryPage setPage={navigate} setFalkCategory={setFalkCategory} goBack={() => navigate(Page.FALK_LYOM_SKIN_TONE)} />;
      case Page.FALK_LYOM_RESULT:
        if (!falkCategory) {
          navigate(Page.FALK_LYOM_CATEGORY);
          return <Spinner />;
        }
        return <FalkLyomResultPage page={page} setPage={navigate} gender={falkGender!} skinTone={falkSkinTone!} category={falkCategory!} />;
      case Page.PRIVACY_POLICY:
        return <PrivacyPolicyPage page={page} setPage={navigate} goBack={() => navigate(Page.SETTINGS)} />;
      case Page.TERMS_CONDITIONS:
        return <TermsConditionsPage page={page} setPage={navigate} goBack={() => navigate(Page.SETTINGS)} />;
      case Page.HELP_FAQ:
        return <HelpFAQPage page={page} setPage={navigate} goBack={() => navigate(Page.SETTINGS)} />;
      case Page.TALEE:
        return <TaleePage page={page} setPage={navigate} />;
      case Page.GEMATRIA:
        return <GematriaPage page={page} setPage={navigate} />;
      default:
        // Default navigation depends on whether a profile exists
        navigate(userName ? Page.HOME : Page.WELCOME_PROFILE);
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
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import SplashScreen from './components/SplashScreen';
import HomePage from './components/HomePage';
import HoroscopePage from './components/HoroscopePage';
import CompatibilityPage from './components/CompatibilityPage';
import NumerologyPage from './components/NumerologyPage';
import TarotReadingPage from './components/TarotReadingPage';
import MorePage from './components/MorePage';
import PrivateReadingPage from './components/PrivateReadingPage';

const App: React.FC = () => {
  // Use a state for the current page, starting with the splash screen
  const [page, setPage] = useState<Page>(Page.SPLASH);

  // Effect to automatically transition from splash to home screen after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(Page.HOME);
    }, 4000); // Extended splash screen duration for the new animation

    return () => clearTimeout(timer);
  }, []);

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
      case Page.MORE:
        return <MorePage setPage={setPage} />;
      case Page.PRIVATE_READING:
        return <PrivateReadingPage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <main className="w-full h-full">{renderPage()}</main>
    </div>
  );
};

export default App;
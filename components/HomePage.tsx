import React from 'react';
import { Page } from '../types';
import Logo from './common/Logo';
import Button from './common/Button';
import SettingsIcon from './common/SettingsIcon';
import { useSettings } from '../hooks/useSettings';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t } = useSettings();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in space-y-10 relative">
      <SettingsIcon setPage={setPage} />
      <Logo />
      <nav>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li>
            <Button onClick={() => setPage(Page.TAROT)} className="w-64 text-lg">
              {t('tarotReading')}
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.HOROSCOPE)} className="w-64 text-lg">
              {t('horoscopes')}
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.NUMEROLOGY)} className="w-64 text-lg">
              {t('numerology')}
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.COMPATIBILITY)} className="w-64 text-lg">
              {t('compatibility')}
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.PRIVATE_READING)} className="w-64 text-lg">
              {t('privateReading')}
            </Button>
          </li>
          <li>
             <Button onClick={() => setPage(Page.MORE)} className="w-64 text-lg">
                {t('more')}
             </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
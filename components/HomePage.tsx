import React from 'react';
import { Page } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import CategoryCard from './common/CategoryCard.tsx';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t } = useSettings();
  
  const categories = [
    { page: Page.FALK_LYOM_WELCOME, title: t('falkLyom'), description: t('falkLyomDesc'), iconUrl: "https://i.postimg.cc/YSzKjGqN/1.png", color: 'orange' as const },
    { page: Page.TALEE, title: t('taleeReading'), description: t('taleeReadingDesc'), iconUrl: "https://i.postimg.cc/cH1q3xrp/2.png", color: 'teal' as const },
    { page: Page.TAROT, title: t('tarotReading'), description: t('tarotReadingDesc'), iconUrl: "https://i.postimg.cc/J0gSSjP8/3.png", color: 'purple' as const },
    { page: Page.GEMATRIA, title: t('gematria'), description: t('gematriaDesc'), iconUrl: "https://i.postimg.cc/k4T0F0SB/4.png", color: 'blue' as const },
    { page: Page.NUMEROLOGY, title: t('numerology'), description: t('numerologyDesc'), iconUrl: "https://i.postimg.cc/RhqjPg1G/5.png", color: 'black' as const },
    { page: Page.COMPATIBILITY, title: t('compatibility'), description: t('compatibilityDesc'), iconUrl: "https://i.postimg.cc/MZFkc8xL/6.png", color: 'pink' as const },
    { page: Page.HOROSCOPE, title: t('horoscopes'), description: t('horoscopesDesc'), iconUrl: "https://i.postimg.cc/WbFBgf11/7.png", color: 'green' as const },
    { page: Page.PRIVATE_READING, title: t('privateReading'), description: t('privateReadingDesc'), iconUrl: "https://i.postimg.cc/wTCSVc1c/8.png", color: 'red' as const },
  ];

  return (
    <div className="container mx-auto px-4 flex flex-col justify-start pt-4 flex-grow animate-fade-in box-border pb-8">
      <main className="w-full max-w-md mx-auto flex flex-col">
        <header className="flex flex-col items-center mb-6">
          <p className="text-base text-brand-light-text/70 dark:text-brand-text-light/70 max-w-xs mx-auto text-center">
            {t('appSlogan')}
          </p>
        </header>
        
        <div className="space-y-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              onClick={() => setPage(cat.page)}
              title={cat.title}
              subtitle={cat.description}
              illustrationUrl={cat.iconUrl}
              color={cat.color}
            />
          ))}
        </div>
      </main>

    </div>
  );
};

export default HomePage;
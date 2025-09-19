

import React from 'react';
import { Page } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import CategoryButton from './common/CategoryButton.tsx';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t } = useSettings();
  
  // Update categories to include gradient and icon details
  const categories = [
    { page: Page.FALK_LYOM_WELCOME, title: t('falkLyom'), description: t('falkLyomDesc'), icon: <img src="https://i.imgur.com/CXOWGWN.png" alt={t('falkLyom')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
    { page: Page.TALEE, title: t('taleeReading'), description: t('taleeReadingDesc'), icon: <img src="https://i.imgur.com/8aV7s4W.png" alt={t('taleeReading')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-blue-600 to-slate-800' },
    { page: Page.TAROT, title: t('tarotReading'), description: t('tarotReadingDesc'), icon: <img src="https://i.imgur.com/bpJSvkH.png" alt={t('tarotReading')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
    { page: Page.GEMATRIA, title: t('gematria'), description: t('gematriaDesc'), icon: <img src="https://i.imgur.com/7g8h4jK.png" alt={t('gematria')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-amber-400 to-purple-600' },
    { page: Page.NUMEROLOGY, title: t('numerology'), description: t('numerologyDesc'), icon: <img src="https://i.imgur.com/uw9ATZc.png" alt={t('numerology')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-teal-400 to-green-500' },
    { page: Page.COMPATIBILITY, title: t('compatibility'), description: t('compatibilityDesc'), icon: <img src="https://i.imgur.com/DrkYXfC.png" alt={t('compatibility')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    { page: Page.HOROSCOPE, title: t('horoscopes'), description: t('horoscopesDesc'), icon: <img src="https://i.imgur.com/VYkiB7K.png" alt={t('horoscopes')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-orange-400 to-red-500' },
    { page: Page.PRIVATE_READING, title: t('privateReading'), description: t('privateReadingDesc'), icon: <img src="https://i.imgur.com/uQxJC94.png" alt={t('privateReading')} className="w-full h-full object-contain" />, gradient: 'bg-gradient-to-br from-slate-600 to-gray-800' },
  ];

  return (
    <div className="container mx-auto px-4 flex flex-col justify-start pt-4 flex-grow animate-fade-in box-border pb-8">
      <main className="w-full max-w-md mx-auto flex flex-col">
        <header className="flex flex-col items-center mb-4">
          <p className="text-base text-brand-light-text/70 dark:text-brand-text-light/70 max-w-xs mx-auto text-center">
            {t('appSlogan')}
          </p>
        </header>
        
        <div className="flex flex-col gap-5"> {/* Increased gap for the new taller buttons */}
          {categories.map((cat, index) => (
            <CategoryButton
              key={cat.title}
              onClick={() => setPage(cat.page)}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
              gradient={cat.gradient}
              iconPosition={index % 2 === 0 ? 'right' : 'left'} // Alternate icon position
            />
          ))}
        </div>
      </main>

    </div>
  );
};

export default HomePage;
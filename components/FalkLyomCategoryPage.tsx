import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface FalkLyomCategoryPageProps {
  setPage: (page: Page) => void;
  setFalkCategory: (category: string) => void;
  goBack: () => void;
}

const FalkLyomCategoryPage: React.FC<FalkLyomCategoryPageProps> = ({ setPage, setFalkCategory, goBack }) => {
  const { t } = useSettings();

  const handleSelect = (categoryKey: 'falkLove' | 'falkWork' | 'falkLuck') => {
    setFalkCategory(t(categoryKey));
    setPage(Page.FALK_LYOM_RESULT);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow animate-fade-in space-y-8 text-center box-border">
      <h2 className="text-4xl font-bold text-brand-accent">
        {t('falkLyomCategoryTitle')}
      </h2>

      <Card className="w-full max-w-md">
        <div className="space-y-4 p-4">
          <Button onClick={() => handleSelect('falkLove')} className="w-full text-2xl py-5">
            {t('loveCategory')}
          </Button>
          <Button onClick={() => handleSelect('falkWork')} className="w-full text-2xl py-5">
            {t('workCategory')}
          </Button>
          <Button onClick={() => handleSelect('falkLuck')} className="w-full text-2xl py-5">
            {t('luckCategory')}
          </Button>
        </div>
      </Card>

      <div className="mt-4 flex gap-4">
        <Button onClick={goBack} variant="secondary">
          &larr; {t('goBack')}
        </Button>
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
      </div>
    </div>
  );
};

export default FalkLyomCategoryPage;

import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

interface FalkLyomCategoryPageProps {
  setPage: (page: Page) => void;
  setFalkCategory: (category: string) => void;
}

const FalkLyomCategoryPage: React.FC<FalkLyomCategoryPageProps> = ({ setPage, setFalkCategory }) => {
  const { t } = useSettings();

  const handleSelect = (categoryKey: 'falkLove' | 'falkWork' | 'falkLuck') => {
    setFalkCategory(t(categoryKey));
    setPage(Page.FALK_LYOM_RESULT);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in space-y-8 text-center">
      <h2 className="text-4xl font-bold text-amber-700 dark:text-amber-300">
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

      <Button onClick={() => setPage(Page.FALK_LYOM_SKIN_TONE)} variant="secondary" className="mt-4">
        &larr; {t('goBack')}
      </Button>
    </div>
  );
};

export default FalkLyomCategoryPage;
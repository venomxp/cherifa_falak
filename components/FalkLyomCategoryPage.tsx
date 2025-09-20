import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import { useSettings } from '../hooks/useSettings.tsx';
import Card from './common/Card.tsx';

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

  const categories = [
    {
      key: 'falkLove' as const,
      title: t('loveCategory'),
    },
    {
      key: 'falkWork' as const,
      title: t('workCategory'),
    },
    {
      key: 'falkLuck' as const,
      title: t('luckCategory'),
    },
  ];

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow animate-fade-in text-center box-border">
      <h2 className="text-4xl font-bold text-brand-accent mb-8">
        {t('falkLyomCategoryTitle')}
      </h2>

      <Card className="w-full max-w-md">
        <div className="space-y-4 p-4">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              onClick={() => handleSelect(cat.key)}
              className="w-full text-2xl py-5"
            >
              {cat.title}
            </Button>
          ))}
        </div>
      </Card>

      <div className="mt-8 flex gap-4">
        <Button onClick={goBack} variant="secondary">
          &larr; {t('goBack')}
        </Button>
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
      </div>
    </div>
  );
};

export default FalkLyomCategoryPage;

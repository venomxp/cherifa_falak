import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface FalkLyomGenderPageProps {
  setPage: (page: Page) => void;
  setFalkGender: (gender: string) => void;
}

const FalkLyomGenderPage: React.FC<FalkLyomGenderPageProps> = ({ setPage, setFalkGender }) => {
  const { t } = useSettings();

  const handleSelect = (genderKey: 'falkMale' | 'falkFemale') => {
    setFalkGender(t(genderKey));
    setPage(Page.FALK_LYOM_SKIN_TONE);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow animate-fade-in space-y-8 text-center box-border">
      <h2 className="text-4xl font-bold text-brand-accent">
        {t('falkGenderPageTitle')}
      </h2>

      <Card className="w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <Button onClick={() => handleSelect('falkFemale')} className="w-full text-2xl py-5">
            {t('female')}
          </Button>
          <Button onClick={() => handleSelect('falkMale')} className="w-full text-2xl py-5">
            {t('male')}
          </Button>
        </div>
      </Card>
      
      <div className="mt-4 flex gap-4">
        <Button onClick={() => setPage(Page.FALK_LYOM_WELCOME)} variant="secondary">
          &larr; {t('goBack')}
        </Button>
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
      </div>
    </div>
  );
};

export default FalkLyomGenderPage;
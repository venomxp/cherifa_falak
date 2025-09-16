import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

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
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in space-y-8 text-center">
      <h2 className="text-4xl font-bold text-amber-700 dark:text-amber-300">
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

      <Button onClick={() => setPage(Page.FALK_LYOM_WELCOME)} variant="secondary" className="mt-4">
        &larr; {t('goBack')}
      </Button>
    </div>
  );
};

export default FalkLyomGenderPage;
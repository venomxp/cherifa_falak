import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

interface FalkLyomSkinTonePageProps {
  setPage: (page: Page) => void;
  setFalkSkinTone: (skinTone: string) => void;
  gender: string;
}

const FalkLyomSkinTonePage: React.FC<FalkLyomSkinTonePageProps> = ({ setPage, setFalkSkinTone, gender }) => {
  const { t } = useSettings();

  const handleSelect = (skinTone: string) => {
    setFalkSkinTone(skinTone);
    setPage(Page.FALK_LYOM_CATEGORY);
  };

  const isMale = gender === t('falkMale');

  const options = isMale
    ? [
        { key: 'white_male', text: t('white_male') },
        { key: 'wheatish_male', text: t('wheatish_male') },
        { key: 'dark_male', text: t('dark_male') },
      ]
    : [
        { key: 'white_female', text: t('white_female') },
        { key: 'wheatish_female', text: t('wheatish_female') },
        { key: 'dark_female', text: t('dark_female') },
      ];

  return (
    <div className="container mx-auto p-4 flex flex-col items-center h-screen justify-center animate-fade-in space-y-8 text-center box-border pb-28">
      <h2 className="text-4xl font-bold text-violet-700 dark:text-violet-300">
        {t('falkSkinTonePageTitle')}
      </h2>

      <Card className="w-full max-w-md">
        <div className="space-y-4 p-4">
          {options.map(option => (
             <Button key={option.key} onClick={() => handleSelect(option.text)} className="w-full text-2xl py-5">
                {option.text}
             </Button>
          ))}
        </div>
      </Card>

      <Button onClick={() => setPage(Page.FALK_LYOM_GENDER)} variant="secondary" className="mt-4">
        &larr; {t('goBack')}
      </Button>
    </div>
  );
};

export default FalkLyomSkinTonePage;
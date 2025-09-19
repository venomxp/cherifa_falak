import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

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
    <div className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow animate-fade-in space-y-8 text-center box-border">
      <h2 className="text-4xl font-bold text-brand-accent">
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

      <div className="mt-4 flex gap-4">
        <Button onClick={() => setPage(Page.FALK_LYOM_GENDER)} variant="secondary">
          &larr; {t('goBack')}
        </Button>
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
      </div>
    </div>
  );
};

export default FalkLyomSkinTonePage;
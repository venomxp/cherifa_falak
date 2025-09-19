import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface AboutPageProps {
  setPage: (page: Page) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setPage }) => {
  const { t } = useSettings();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center h-screen justify-center animate-fade-in box-border">
      <Card className="w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-brand-primary dark:text-brand-accent">
          {t('aboutAppTitle')}
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300/80 leading-relaxed">
          {t('aboutAppBody')}
        </p>
        <div className="mt-8">
            <h3 className="text-2xl font-semibold text-brand-primary dark:text-brand-accent">{t('contactUs')}</h3>
            <p className="mt-2 text-lg text-slate-700 dark:text-slate-300/80">{t('contactEmail')}</p>
        </div>
      </Card>
      <Button onClick={() => setPage(Page.SETTINGS)} variant="secondary" className="mt-8">
        &larr; {t('settings')}
      </Button>
    </div>
  );
};

export default AboutPage;
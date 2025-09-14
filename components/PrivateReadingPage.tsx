import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import Logo from './common/Logo';
import { useSettings } from '../hooks/useSettings';

interface PrivateReadingPageProps {
  setPage: (page: Page) => void;
}

const PrivateReadingPage: React.FC<PrivateReadingPageProps> = ({ setPage }) => {
  const { t } = useSettings();
  const whatsappLink = "https://wa.me/+212649427892";

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in">
      <Logo className="mb-8" setPage={setPage} />
      <Card className="w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-amber-700 dark:text-amber-300">
          {t('privateReadingTitle')}
        </h2>
        <p className="text-lg text-slate-700 dark:text-amber-100/80 leading-relaxed">
         {t('privateReadingBody')}
        </p>
        <div className="mt-8">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full text-lg">
                {t('bookOnWhatsApp')}
              </Button>
            </a>
        </div>
      </Card>
      <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
        {t('goHome')}
      </Button>
    </div>
  );
};

export default PrivateReadingPage;
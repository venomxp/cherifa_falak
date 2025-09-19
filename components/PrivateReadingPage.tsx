import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface PrivateReadingPageProps {
  setPage: (page: Page) => void;
}

const PrivateReadingPage: React.FC<PrivateReadingPageProps> = ({ setPage }) => {
  const { t } = useSettings();
  const whatsappLink = "https://wa.me/+212649427892";

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow animate-fade-in box-border">
      <Card className="w-full max-w-lg text-center">
        <h2 className="text-3xl font-logo-en font-bold mb-4 text-brand-accent tracking-wider">
          {t('privateReading')}
        </h2>
        <p className="text-lg text-brand-light-text/80 dark:text-brand-text-light/80 leading-relaxed">
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
      <div className="mt-8">
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">
            {t('goHome')}
        </Button>
      </div>
    </div>
  );
};

export default PrivateReadingPage;
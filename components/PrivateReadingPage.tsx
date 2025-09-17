import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

interface PrivateReadingPageProps {
  setPage: (page: Page) => void;
}

const PrivateReadingPage: React.FC<PrivateReadingPageProps> = ({ setPage }) => {
  const { t } = useSettings();
  const whatsappLink = "https://wa.me/+212649427892";

  return (
    <div className="container mx-auto p-4 flex flex-col items-center h-screen justify-center animate-fade-in box-border pb-28">
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
    </div>
  );
};

export default PrivateReadingPage;
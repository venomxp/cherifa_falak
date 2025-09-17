import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

interface PrivacyPolicyPageProps {
  setPage: (page: Page) => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setPage }) => {
  const { t, language } = useSettings();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in box-border pb-28">
      <div className="flex-grow w-full max-w-2xl flex flex-col justify-center">
        <Card>
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center text-brand-accent">
              {t('privacyPolicyTitle')}
            </h2>
            <p className={`text-lg whitespace-pre-wrap leading-relaxed text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('privacyPolicyBody')}
            </p>
          </div>
        </Card>
        <div className="text-center mt-8">
            <Button onClick={() => setPage(Page.SETTINGS)} variant="secondary">
                &larr; {t('settings')}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
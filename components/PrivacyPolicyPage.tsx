import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface PrivacyPolicyPageProps {
  page: Page;
  setPage: (page: Page) => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ page, setPage }) => {
  const { t, language } = useSettings();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in box-border">
      <div className="flex-grow w-full max-w-2xl flex flex-col justify-center">
        <Card>
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center text-brand-accent">
              {t('privacyPolicyTitle')}
            </h2>
            <p className={`text-lg whitespace-pre-wrap leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('privacyPolicyBody')}
            </p>
          </div>
        </Card>
        <div className="text-center mt-8 flex justify-center gap-4">
            <Button onClick={() => setPage(Page.SETTINGS)} variant="secondary">
                &larr; {t('settings')}
            </Button>
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
import React from 'react';
import { Page } from '../types.ts';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface HelpFAQPageProps {
  page: Page;
  setPage: (page: Page) => void;
  goBack: () => void;
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <details className="p-4 rounded-lg bg-brand-dark group">
    <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center text-brand-accent">
      {question}
      <span className="transform transition-transform duration-300 group-open:rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </summary>
    <p className="mt-2 text-brand-text-light/80 leading-relaxed">
      {answer}
    </p>
  </details>
);

const HelpFAQPage: React.FC<HelpFAQPageProps> = ({ page, setPage, goBack }) => {
  const { t } = useSettings();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in box-border">
      <div className="flex-grow w-full max-w-2xl flex flex-col justify-center">
        <Card>
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center text-brand-accent">
              {t('helpFAQTitle')}
            </h2>
            <div className="space-y-4 mt-6">
              <FAQItem question={t('faqQuestion1')} answer={t('faqAnswer1')} />
              <FAQItem question={t('faqQuestion2')} answer={t('faqAnswer2')} />
              <FAQItem question={t('faqQuestion3')} answer={t('faqAnswer3')} />
            </div>
          </div>
        </Card>
        <div className="text-center mt-8 flex justify-center gap-4">
            <Button onClick={goBack} variant="secondary">
                &larr; {t('settings')}
            </Button>
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQPage;

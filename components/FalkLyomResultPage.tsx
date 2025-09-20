import React, { useState, useEffect } from 'react';
import { Page, MoroccanTarotCard } from '../types.ts';
import { MOROCCAN_TAROT_CARDS } from '../constants.ts';
import { falkLyomInterpretations } from '../localization/falkLyomData.ts';
import Button from './common/Button.tsx';
import Spinner from './common/Spinner.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';

interface FalkLyomResultPageProps {
  page: Page;
  setPage: (page: Page) => void;
  gender: string;
  skinTone: string;
  category: string;
}

const FalkLyomResultPage: React.FC<FalkLyomResultPageProps> = ({ page, setPage, gender, skinTone, category }) => {
  const { t, language, addReadingToHistory } = useSettings();
  const [drawnCard, setDrawnCard] = useState<MoroccanTarotCard | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getLocalReading = () => {
      if (!category || !gender || !skinTone) return;

      setIsLoading(true);
      setError('');
      setInterpretation('');

      // Draw a random card
      const cardIndex = Math.floor(Math.random() * MOROCCAN_TAROT_CARDS.length);
      const card = MOROCCAN_TAROT_CARDS[cardIndex];
      setDrawnCard(card);

      // Get local interpretation
      try {
        // Map the translated category string back to a simple key for the data object
        let categoryKey: 'love' | 'work' | 'luck';
        if (category === t('loveCategory')) {
            categoryKey = 'love';
        } else if (category === t('workCategory')) {
            categoryKey = 'work';
        } else {
            categoryKey = 'luck';
        }
        
        const interpretationsForCard = falkLyomInterpretations[language][card.key][categoryKey];
        const randomIndex = Math.floor(Math.random() * interpretationsForCard.length);
        const result = interpretationsForCard[randomIndex];
        
        setInterpretation(result);

        if (result) {
            const historyItemContent = JSON.stringify({ card, interpretation: result });
            addReadingToHistory({
                type: 'Falk Lyom',
                title: t('falkLyomReadingHistoryTitle', { category }),
                content: historyItemContent,
            });
        }
      } catch (err) {
        console.error("Error getting local Falk Lyom interpretation", err);
        setError(t('errorFalkLyom'));
      } finally {
          setIsLoading(false);
      }
    };
    
    // Use a small timeout to make the loading feel more natural
    const timer = setTimeout(getLocalReading, 500);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, gender, skinTone, language]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-grow animate-fade-in box-border">
      <div className="flex flex-col items-center justify-start pt-16 w-full">
        <Card className="w-full max-w-lg text-center">
          {isLoading ? (
            <div className="p-8">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-red-500 p-8">{error}</p>
          ) : (
            <div className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-brand-accent/80">
                {t('yourCardIs')}
              </h3>
              <h2 className="text-4xl font-bold my-3 text-brand-accent">
                {drawnCard?.name}
              </h2>
              <div className="w-1/2 h-px bg-brand-accent/50 my-4 mx-auto"></div>
              <p className={`text-xl whitespace-pre-wrap leading-relaxed text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {interpretation}
              </p>
            </div>
          )}
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setPage(Page.FALK_LYOM_CATEGORY)} disabled={isLoading} variant="primary">
                {t('readingAgain')}
            </Button>
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
        </div>
      </div>
    </div>
  );
};

export default FalkLyomResultPage;
import React, { useState, useEffect } from 'react';
import { Page, MoroccanTarotCard } from '../types';
import { getFalkLyomInterpretation } from '../services/geminiService';
import { MOROCCAN_TAROT_CARDS } from '../constants';
import Button from './common/Button';
import Spinner from './common/Spinner';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

interface FalkLyomResultPageProps {
  setPage: (page: Page) => void;
  gender: string;
  skinTone: string;
  category: string;
}

const FalkLyomResultPage: React.FC<FalkLyomResultPageProps> = ({ setPage, gender, skinTone, category }) => {
  const { t } = useSettings();
  const [drawnCard, setDrawnCard] = useState<MoroccanTarotCard | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchInterpretation = async () => {
      setIsLoading(true);
      setError('');
      setInterpretation('');
      
      // Draw a random card
      const cardIndex = Math.floor(Math.random() * MOROCCAN_TAROT_CARDS.length);
      const card = MOROCCAN_TAROT_CARDS[cardIndex];
      setDrawnCard(card);

      try {
        const result = await getFalkLyomInterpretation(card.name, category, gender, skinTone);
        setInterpretation(result);
      } catch (err) {
        setError(t('errorFalkLyom'));
      } finally {
        setIsLoading(false);
      }
    };

    if (category && gender && skinTone) {
        fetchInterpretation();
    }
  }, [category, gender, skinTone, t]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in">
      <Card className="w-full max-w-lg text-center">
        {isLoading ? (
          <div className="p-8">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-red-500 p-8">{error}</p>
        ) : (
          <div className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-slate-600 dark:text-amber-200/80">
              {t('yourCardIs')}
            </h3>
            <h2 className="text-4xl font-bold my-3 text-amber-700 dark:text-amber-300">
              {drawnCard?.name}
            </h2>
            <div className="w-1/2 h-px bg-amber-500/50 my-4 mx-auto"></div>
            <p className="text-xl whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-[#F5EFE6]" dir="rtl">
              {interpretation}
            </p>
          </div>
        )}
      </Card>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button onClick={() => setPage(Page.FALK_LYOM_CATEGORY)} disabled={isLoading}>
          {t('readingAgain')}
        </Button>
        <Button onClick={() => setPage(Page.HOME)} variant="secondary">
          {t('goHome')}
        </Button>
      </div>
    </div>
  );
};

export default FalkLyomResultPage;
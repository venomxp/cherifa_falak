import React, { useState, useEffect } from 'react';
import { Page, TarotCardInfo } from '../types';
import { getTarotInterpretationStream } from '../services/geminiService';
import { TAROT_CARDS } from '../constants';
import Button from './common/Button';
import Spinner from './common/Spinner';
import TarotCard from './common/TarotCard';
import Card from './common/Card';
import { useSettings } from '../hooks/useSettings';

interface TarotReadingPageProps {
  setPage: (page: Page) => void;
}

const TarotReadingPage: React.FC<TarotReadingPageProps> = ({ setPage }) => {
  const { language, t } = useSettings();
  const [drawnCard, setDrawnCard] = useState<TarotCardInfo | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Function to draw a random card from the deck
  const drawCard = () => {
    const cardIndex = Math.floor(Math.random() * TAROT_CARDS.length);
    const card = TAROT_CARDS[cardIndex];
    setDrawnCard(card);
    setIsFlipped(false);
    setInterpretation('');
    setError('');
  };

  // Draw a card when the component mounts
  useEffect(() => {
    drawCard();
  }, []);

  // Handle flipping the card and fetching its meaning
  const handleCardFlip = async () => {
    if (!drawnCard || isFlipped || isStreaming) return;

    setIsFlipped(true);
    setIsLoading(true);
    setError('');
    setInterpretation('');

    try {
      const stream = await getTarotInterpretationStream(drawnCard.english, language);
      setIsLoading(false);
      setIsStreaming(true);

      for await (const chunk of stream) {
        setInterpretation((prev) => prev + chunk.text);
      }
    } catch (err) {
      setError(t('errorTarot'));
      setIsLoading(false);
    } finally {
      setIsStreaming(false);
    }
  };

  const drawNewCard = () => {
    setIsStreaming(false);
    drawCard();
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen animate-fade-in">
      <h2 className="text-4xl font-bold my-8 text-center text-amber-700 dark:text-amber-300">
        {t('tarotPageTitle')}
      </h2>

      <p className="text-xl text-center mb-8 text-slate-700 dark:text-amber-200/80 max-w-lg">
        {t('tarotPageInstruction')}
      </p>

      {/* Tarot Card Display */}
      <div className="w-64 h-96 mb-8 cursor-pointer" onClick={handleCardFlip} style={{ perspective: '1000px' }}>
        {drawnCard && (
          <TarotCard
            isFlipped={isFlipped}
            cardNameEnglish={drawnCard.english}
            cardNameArabic={drawnCard.arabic}
          />
        )}
      </div>

      {/* Result Display */}
      {isFlipped && (
        <div className="w-full max-w-2xl">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          ) : (
            <Card className="animate-fade-in">
              <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-4 text-center">
                {drawnCard?.arabic} ({drawnCard?.english})
              </h3>
              <p className={`text-lg whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-[#F5EFE6] ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {interpretation}
                {isStreaming && <span className="inline-block w-1 h-5 bg-amber-700 dark:bg-amber-300 animate-pulse ml-1 align-bottom"></span>}
              </p>
              <div className="text-center mt-6">
                <Button onClick={drawNewCard} disabled={isStreaming}>{t('drawAnotherCard')}</Button>
              </div>
            </Card>
          )}
        </div>
      )}

      <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
        {t('goHome')}
      </Button>
    </div>
  );
};

export default TarotReadingPage;
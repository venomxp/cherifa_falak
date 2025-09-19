import React, { useState } from 'react';
import { Page, TarotCardInfo } from '../types.ts';
import { getTarotInterpretationStream } from '../services/geminiService.ts';
import { TAROT_CARDS } from '../constants.ts';
import Button from './common/Button.tsx';
import Spinner from './common/Spinner.tsx';
import TarotCard from './common/TarotCard.tsx';
import Card from './common/Card.tsx';
import { useSettings } from '../hooks/useSettings.tsx';
import TarotSpread from './common/TarotSpread.tsx';
import { triggerHapticFeedback } from '../utils/haptics.ts';

interface TarotReadingPageProps {
  page: Page;
  setPage: (page: Page) => void;
}

const TarotReadingPage: React.FC<TarotReadingPageProps> = ({ page, setPage }) => {
  const { language, t, addReadingToHistory } = useSettings();
  const [step, setStep] = useState<'selection' | 'reading'>('selection');
  const [drawnCard, setDrawnCard] = useState<TarotCardInfo | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const fetchInterpretation = async (card: TarotCardInfo) => {
    setIsLoading(true);
    setIsStreaming(false);
    setError('');
    setInterpretation('');
    let fullInterpretation = '';

    try {
      const stream = await getTarotInterpretationStream(card.english, language);
      setIsLoading(false);
      setIsStreaming(true);

      for await (const chunk of stream) {
        const textChunk = chunk.text;
        fullInterpretation += textChunk;
        setInterpretation((prev) => prev + textChunk);
      }
    } catch (err) {
      setError(t('errorTarot'));
      setIsLoading(false);
    } finally {
      setIsStreaming(false);
      if (fullInterpretation) {
        addReadingToHistory({
          type: 'Tarot',
          title: card.english,
          content: fullInterpretation,
        });
      }
    }
  };
  
  const handleCardSelect = () => {
    triggerHapticFeedback();
    const cardIndex = Math.floor(Math.random() * TAROT_CARDS.length);
    const actualCard = TAROT_CARDS[cardIndex];
    setDrawnCard(actualCard);

    setStep('reading');
    
    // A short delay to allow the view to change before the card flips
    setTimeout(() => {
        setIsFlipped(true);
        fetchInterpretation(actualCard);
    }, 500);
  };

  const resetReading = () => {
    setStep('selection');
    setDrawnCard(null);
    setInterpretation('');
    setError('');
    setIsFlipped(false);
    setIsLoading(false);
    setIsStreaming(false);
  };
  
  const renderSelectionView = () => (
     <div className="flex flex-col items-center text-center w-full flex-grow animate-fade-in">
        <h2 className="text-4xl font-logo-en font-bold my-8 text-center text-brand-accent tracking-wider">
          {t('tarotReading')}
        </h2>
        <p className="text-xl text-center mb-8 text-brand-light-text/80 dark:text-brand-text-light/80 max-w-lg">
          {t('tarotPageInstruction')}
        </p>
        <TarotSpread onCardSelect={handleCardSelect} />
        <div className="mt-8">
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">
                {t('goHome')}
            </Button>
        </div>
     </div>
  );
  
  const renderReadingView = () => (
    <div className="w-full max-w-2xl flex flex-col items-center flex-grow py-8 animate-fade-in">
      <div 
        className="w-64 h-96 mb-8"
        style={{ perspective: '1000px' }}
      >
        {drawnCard && (
          <TarotCard
            isFlipped={isFlipped}
            cardNameEnglish={drawnCard.english}
            cardNameArabic={drawnCard.arabic}
          />
        )}
      </div>

      <div className={`w-full max-w-2xl transition-opacity duration-700 delay-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <Card>
            <h3 className="text-2xl font-logo-en font-bold text-brand-accent mb-4 text-center">
              {drawnCard?.english}
            </h3>
            <p className={`text-lg whitespace-pre-wrap leading-relaxed text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {interpretation}
              {isStreaming && <span className="inline-block w-1 h-5 bg-brand-accent animate-pulse ml-1 align-bottom"></span>}
            </p>
          </Card>
        )}
        <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={resetReading} disabled={isStreaming}>{t('drawAnotherCard')}</Button>
            <Button onClick={() => setPage(Page.HOME)} variant="secondary">{t('goHome')}</Button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-grow animate-fade-in box-border pb-24">
      <div className="flex-grow flex flex-col w-full items-center justify-start">
        {step === 'selection' ? renderSelectionView() : renderReadingView()}
      </div>
    </div>
  );
};

export default TarotReadingPage;
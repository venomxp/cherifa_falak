import React, { useState, useEffect } from 'react';
import TarotCard from './common/TarotCard';

const SplashScreen: React.FC = () => {
  const [isFanned, setIsFanned] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  // Sequence the animations: fan out after a delay, then merge back
  useEffect(() => {
    const fanTimer = setTimeout(() => setIsFanned(true), 500);
    const mergeTimer = setTimeout(() => {
      setIsFanned(false);
      setIsMerged(true);
    }, 2500);

    return () => {
      clearTimeout(fanTimer);
      clearTimeout(mergeTimer);
    };
  }, []);

  const cardCount = 5;
  const cards = Array.from({ length: cardCount });

  const getCardStyle = (index: number): React.CSSProperties => {
    const centerIndex = Math.floor(cardCount / 2);
    const offset = index - centerIndex;
    const fanRotation = offset * 15; // degrees
    const fanTranslationX = offset * 50; // percentage
    const fanTranslationY = Math.abs(offset) * 15; // percentage

    return {
      transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      transform: isFanned
        ? `rotateZ(${fanRotation}deg) translate(${fanTranslationX}%, ${fanTranslationY}%)`
        : isMerged
        ? 'rotateZ(0deg) translate(0, 0)'
        : 'rotateZ(0deg) translate(0, 150%)', // Start off-screen
      zIndex: centerIndex - Math.abs(offset),
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <div
        className="relative w-32 h-52 transition-all duration-1000"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <div
            className="absolute inset-0 rounded-full bg-brand-accent/30 blur-3xl animate-pulse"
            style={{ animationDuration: '3s' }}
        ></div>
        {cards.map((_, index) => (
          <div
            key={index}
            className="absolute w-full h-full"
            style={getCardStyle(index)}
          >
            <TarotCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
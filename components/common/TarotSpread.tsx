import React from 'react';
import TarotCard from './TarotCard';
import { TarotCardInfo } from '../../types';

interface TarotSpreadProps {
  onCardSelect: (card: TarotCardInfo) => void;
}

const TarotSpread: React.FC<TarotSpreadProps> = ({ onCardSelect }) => {
  const cardCount = 7;

  // Placeholder cards for visual representation
  const cards = Array.from({ length: cardCount }).map((_, i) => ({
    english: `Card ${i + 1}`,
    arabic: `بطاقة ${i + 1}`,
  }));

  return (
    <div
      className="relative w-full flex justify-center items-center py-8"
      style={{ height: '250px' }} // Container to hold the spread
    >
      <div className="flex justify-center items-center -space-x-12 rtl:space-x-reverse">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-20 h-28 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-110 hover:z-10 opacity-0 animate-slide-in-up"
            style={{
              // Add a slight rotation to each card for a more natural look
              transform: `rotate(${(index - Math.floor(cardCount / 2)) * 4}deg)`,
              animationDelay: `${index * 80}ms`,
            }}
            onClick={() => onCardSelect(card)}
          >
            <TarotCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarotSpread;
import React from 'react';
import TarotCard from './TarotCard.tsx';

interface TarotSpreadProps {
  onCardSelect: () => void;
}

const TarotSpread: React.FC<TarotSpreadProps> = ({ onCardSelect }) => {
  const cardStyles = [
    { transform: 'rotate(-5deg)', animationDelay: '0ms' },
    { transform: 'rotate(3deg)', animationDelay: '100ms' },
    { transform: 'rotate(4deg)', animationDelay: '200ms' },
    { transform: 'rotate(-2deg)', animationDelay: '300ms' },
  ];

  return (
    <div className="w-full max-w-sm p-4">
      <div className="grid grid-cols-2 gap-6">
        {cardStyles.map((style, index) => (
          <div
            key={index}
            className="cursor-pointer transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-110 opacity-0 animate-slide-in-up aspect-[2/3]"
            style={{ animationDelay: style.animationDelay }}
            onClick={onCardSelect}
          >
            <div className="w-full h-full" style={{ transform: style.transform }}>
              <TarotCard />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarotSpread;
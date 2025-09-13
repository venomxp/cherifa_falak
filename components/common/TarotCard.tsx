import React from 'react';

interface TarotCardProps {
  children?: React.ReactNode;
  className?: string;
  isFlipped?: boolean;
  cardNameEnglish?: string;
  cardNameArabic?: string;
}

const TarotCard: React.FC<TarotCardProps> = ({ children, className = '', isFlipped = false, cardNameEnglish, cardNameArabic }) => {
  const cardBack = (
    <div className="absolute inset-0 w-full h-full bg-[#221E1F] rounded-lg p-2 flex items-center justify-center [backface-visibility:hidden]">
       <div className="w-full h-full border-2 border-amber-400/50 rounded-md flex items-center justify-center">
            <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#F5EFE6" strokeWidth="2"/>
                <circle cx="50" cy="50" r="25" stroke="#9A6A5C" strokeWidth="2"/>
                <circle cx="50" cy="50" r="10" fill="#F5EFE6"/>
            </svg>
       </div>
    </div>
  );

  const cardFrontContent = cardNameEnglish && cardNameArabic ? (
    <div className="flex flex-col items-center justify-center h-full w-full text-center relative bg-gradient-to-br from-[#fdfbf7] to-[#e8e0d5] rounded-md">
      {/* Ornate borders */}
      <div className="absolute inset-2 border-2 border-amber-600/50 rounded-md"></div>
      <div className="absolute inset-3 border border-amber-500/30 rounded-sm"></div>
      
      {/* Subtle background icon */}
      <div className="absolute inset-0 flex items-center justify-center">
          <svg width="50%" height="50%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10 text-[#9A6A5C]">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="currentColor" strokeWidth="4"/>
              <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="4"/>
              <circle cx="50" cy="50" r="10" fill="currentColor"/>
          </svg>
      </div>

      {/* Text content on top */}
      <div className="relative z-10 flex flex-col justify-center items-center p-4">
          <p className="text-2xl font-bold text-[#6d4c41] tracking-wider" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>{cardNameEnglish}</p>
          <div className="w-1/2 h-px bg-amber-500/70 my-2"></div>
          <p className="text-xl font-['Tajawal'] font-semibold text-[#3e2723]">{cardNameArabic}</p>
      </div>
    </div>
  ) : (
    // Fallback for other pages using TarotCard as a container
    children
  );

  const cardFront = (
     <div className="absolute inset-0 w-full h-full text-[#221E1F] rounded-lg p-1 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        {cardFrontContent}
    </div>
  );

  return (
    <div
      className={`relative w-full h-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''} ${className}`}
    >
      {/* Card Base with border to simulate depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-600 rounded-lg shadow-2xl shadow-black/50"></div>
      
      {cardBack}
      {cardFront}
    </div>
  );
};

export default TarotCard;

import React from 'react';

interface TarotCardProps {
  children?: React.ReactNode;
  className?: string;
  isFlipped?: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ children, className = '', isFlipped = false }) => {
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

  const cardFront = (
     <div className="absolute inset-0 w-full h-full bg-[#F5EFE6] text-[#221E1F] rounded-lg p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        {children}
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

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
    <div className="absolute inset-0 w-full h-full bg-brand-light-dark rounded-lg p-3 flex items-center justify-center [backface-visibility:hidden]">
      <div className="w-full h-full border border-brand-accent/50 rounded-md flex items-center justify-center relative overflow-hidden">
         {/* Decorative line art */}
        <svg className="absolute w-full h-full text-brand-accent opacity-80" fill="none" viewBox="0 0 100 150">
            {/* Ornate border */}
            <rect x="5" y="5" width="90" height="140" rx="5" stroke="currentColor" strokeWidth="1" />
            <rect x="9" y="9" width="82" height="132" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>

            {/* Central Sun symbol */}
            <circle cx="50" cy="75" r="18" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="75" r="14" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
            
            {/* Sun Rays */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * 360;
              const x1 = 50 + 22 * Math.cos(angle * Math.PI / 180);
              const y1 = 75 + 22 * Math.sin(angle * Math.PI / 180);
              const x2 = 50 + 26 * Math.cos(angle * Math.PI / 180);
              const y2 = 75 + 26 * Math.sin(angle * Math.PI / 180);
              const isLongRay = i % 2 === 0;
              const rayLength = isLongRay ? 32 : 28;
              const x3 = 50 + rayLength * Math.cos(angle * Math.PI / 180);
              const y3 = 75 + rayLength * Math.sin(angle * Math.PI / 180);
              return <line key={i} x1={x1} y1={y1} x2={x3} y2={y3} stroke="currentColor" strokeWidth={isLongRay ? 0.7 : 0.5} />;
            })}

            {/* Corner Stars */}
            <path d="M15 15 l 1 2.5 l 2.5 -1 l -1 2.5 l 2.5 1 l -2.5 1 l 1 2.5 l -2.5 -1 l -1 2.5 l -1 -2.5 l -2.5 1 l 1 -2.5 l -2.5 -1 l 2.5 -1 l -1 -2.5 l 2.5 1Z" fill="currentColor" opacity="0.8" />
            <path d="M85 15 l 1 2.5 l 2.5 -1 l -1 2.5 l 2.5 1 l -2.5 1 l 1 2.5 l -2.5 -1 l -1 2.5 l -1 -2.5 l -2.5 1 l 1 -2.5 l -2.5 -1 l 2.5 -1 l -1 -2.5 l 2.5 1Z" fill="currentColor" opacity="0.8" transform="scale(-1, 1) translate(-100, 0)" />
            <path d="M15 135 l 1 2.5 l 2.5 -1 l -1 2.5 l 2.5 1 l -2.5 1 l 1 2.5 l -2.5 -1 l -1 2.5 l -1 -2.5 l -2.5 1 l 1 -2.5 l -2.5 -1 l 2.5 -1 l -1 -2.5 l 2.5 1Z" fill="currentColor" opacity="0.8" transform="scale(1, -1) translate(0, -150)"/>
            <path d="M85 135 l 1 2.5 l 2.5 -1 l -1 2.5 l 2.5 1 l -2.5 1 l 1 2.5 l -2.5 -1 l -1 2.5 l -1 -2.5 l -2.5 1 l 1 -2.5 l -2.5 -1 l 2.5 -1 l -1 -2.5 l 2.5 1Z" fill="currentColor" opacity="0.8" transform="scale(-1, -1) translate(-100, -150)"/>
        </svg>
      </div>
    </div>
  );

  const cardFrontContent = cardNameEnglish && cardNameArabic ? (
    <div className="flex flex-col items-center justify-center h-full w-full text-center relative bg-brand-light-dark rounded-md p-3">
      {/* Ornate borders */}
      <div className="absolute inset-2 border border-brand-accent/50 rounded-md"></div>
      <div className="absolute inset-3 border border-brand-accent/20 rounded-sm"></div>
      
      {/* Text content on top */}
      <div className="relative z-10 flex flex-col justify-center items-center p-4">
          <p className="text-2xl font-['Cinzel_Decorative'] font-bold text-brand-accent tracking-wider" style={{textShadow: '1px 1px 3px rgba(0,0,0, 0.5)'}}>{cardNameEnglish}</p>
          <div className="w-1/2 h-px bg-brand-accent/70 my-2"></div>
          <p className="text-xl font-['Tajawal'] font-semibold text-brand-text-light">{cardNameArabic}</p>
      </div>
    </div>
  ) : (
    children
  );

  const cardFront = (
     <div className="absolute inset-0 w-full h-full rounded-lg p-1 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        {cardFrontContent}
    </div>
  );

  return (
    <div
      className={`relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''} ${className}`}
    >
      <div className={`absolute inset-0 bg-brand-dark rounded-lg shadow-2xl shadow-black/50 ${isFlipped ? 'animate-pulse-glow' : '[filter:drop-shadow(0_0_10px_rgba(212,140,94,0.3))]'}`}></div>
      {cardBack}
      {cardFront}
    </div>
  );
};

export default TarotCard;
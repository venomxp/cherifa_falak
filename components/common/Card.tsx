import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-300/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg dark:shadow-2xl dark:shadow-black/30 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
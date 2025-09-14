import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white/50 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-beige-200/20 rounded-2xl p-6 shadow-lg dark:shadow-2xl dark:shadow-black/30 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
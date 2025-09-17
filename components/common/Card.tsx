import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-brand-light-card dark:bg-brand-light-dark border border-brand-light-border dark:border-brand-border rounded-2xl p-6 shadow-lg shadow-black/10 dark:shadow-black/30 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
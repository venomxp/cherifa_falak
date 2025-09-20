import React from 'react';
import { triggerHapticFeedback } from '../../utils/haptics.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', onClick, ...props }) => {
  // Base classes for the button, providing consistent padding, font, and interaction feedback.
  const baseClasses = "px-6 py-3 font-bold rounded-full transition-all duration-200 transform disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 hover:brightness-110 active:scale-95";

  // Variant classes are now aligned with the application's design system for theme consistency.
  const variantClasses = {
    primary: "bg-brand-accent text-brand-button-text hover:bg-brand-accent-dark focus:ring-brand-accent/50",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 focus:ring-brand-accent/50",
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerHapticFeedback();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

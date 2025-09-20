import React from 'react';
import { triggerHapticFeedback } from '../../utils/haptics.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', onClick, ...props }) => {
  // Base classes for the button. A cleaner, modern style without the 3D effect.
  const baseClasses = "px-6 py-3 font-bold rounded-full transition-all duration-200 transform disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 hover:brightness-110 active:scale-95";

  // New variant classes. Primary is the main call-to-action (solid, darker). Secondary is for less prominent actions (light fill).
  const variantClasses = {
    primary: "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:ring-slate-500",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-slate-700",
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

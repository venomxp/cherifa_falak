import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = "px-6 py-3 font-bold rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg focus:outline-none focus:ring-4";

  const variantClasses = {
    primary: "text-[#221E1F] bg-gradient-to-br from-amber-200 to-yellow-500 hover:from-amber-300 hover:to-yellow-600 shadow-yellow-500/30 focus:ring-amber-400/50",
    secondary: "text-amber-700 dark:text-[#F5EFE6] bg-black/10 dark:bg-black/20 border-2 border-amber-500/30 dark:border-amber-500/50 hover:bg-amber-500/20 hover:border-amber-500 focus:ring-amber-500/50",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
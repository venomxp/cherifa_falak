import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = "px-6 py-3 font-bold rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg focus:outline-none focus:ring-4";

  const variantClasses = {
    primary: "text-white bg-gradient-to-br from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 shadow-lg shadow-violet-500/30 dark:shadow-violet-800/40 focus:ring-violet-400/50",
    secondary: "text-violet-700 dark:text-violet-300 bg-black/5 dark:bg-white/5 border-2 border-violet-500/30 dark:border-violet-400/50 hover:bg-violet-500/10 hover:border-violet-500 focus:ring-violet-500/50",
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
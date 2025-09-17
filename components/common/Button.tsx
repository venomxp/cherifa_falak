import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = "px-6 py-3 font-bold rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg focus:outline-none focus:ring-4";

  const variantClasses = {
    primary: "text-brand-dark bg-brand-accent hover:bg-brand-accent-dark shadow-lg shadow-brand-accent/20 focus:ring-brand-accent/50",
    secondary: "text-brand-accent bg-transparent border-2 border-brand-accent/50 hover:bg-brand-accent/10 hover:border-brand-accent focus:ring-brand-accent/50",
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
import React from 'react';
import { triggerHapticFeedback } from '../../utils/haptics.ts';

interface CategoryButtonProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ onClick, title, description, icon }) => {
  
  const handleClick = () => {
    triggerHapticFeedback();
    onClick();
  };
  
  const gradient = 'from-violet-500 to-purple-500';

  return (
    <button
      onClick={handleClick}
      className="group relative w-full h-40 rounded-2xl p-4 flex flex-col items-center justify-center text-center overflow-hidden shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>

      {/* Icon Image */}
      <div className="absolute -bottom-5 -right-5 rtl:-left-5 rtl:-right-auto w-24 h-24 opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300 transform group-hover:rotate-6">
        {icon}
      </div>

      {/* Text Content */}
      <div className="relative z-10">
        <h3 className="text-white text-xl font-bold" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
          {title}
        </h3>
        <p className="text-white/80 text-sm mt-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          {description}
        </p>
      </div>
    </button>
  );
};

export default CategoryButton;
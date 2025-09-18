import React from 'react';
import { triggerHapticFeedback } from '../../utils/haptics';

interface CategoryButtonProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  iconPosition?: 'left' | 'right';
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ onClick, title, description, icon, gradient, iconPosition = 'right' }) => {
  
  const handleClick = () => {
    triggerHapticFeedback();
    onClick();
  };

  const iconPositionClasses = iconPosition === 'left' 
    ? "left-0 translate-x-1/4 rtl:left-auto rtl:right-0 rtl:-translate-x-1/4" 
    : "right-0 -translate-x-1/4 rtl:right-auto rtl:left-0 rtl:translate-x-1/4";
  
  const textAlignClasses = iconPosition === 'right'
    ? 'justify-start'
    : 'justify-end';

  return (
    <button
      onClick={handleClick}
      className={`group relative flex items-center w-full h-36 p-6 rounded-2xl text-white shadow-lg transition-all transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-500/50 overflow-hidden ${textAlignClasses} ${gradient}`}
    >
      <div className="z-10 w-3/5 text-center">
        <h3 className="text-4xl font-bold">{title}</h3>
        <p className="text-sm font-semibold text-white/80 mt-1">{description}</p>
      </div>
      
      <div className={`absolute top-1/2 -translate-y-1/2 w-28 h-28 transition-transform duration-300 group-hover:scale-110 z-0 ${iconPositionClasses}`}>
        <div className="w-full h-full opacity-80 group-hover:opacity-100">
            {icon}
        </div>
      </div>
    </button>
  );
};

export default CategoryButton;
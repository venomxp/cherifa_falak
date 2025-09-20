import React from 'react';
import { triggerHapticFeedback } from '../../utils/haptics.ts';

interface CategoryCardProps {
  title: string;
  subtitle: string;
  illustrationUrl: string;
  color: 'orange' | 'black' | 'blue' | 'purple' | 'teal' | 'red' | 'pink' | 'green';
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, subtitle, illustrationUrl, color, onClick }) => {
  const handleClick = () => {
    triggerHapticFeedback();
    onClick();
  };

  // Define variants for the 3D effect, with a main background and a darker border for depth.
  const colorVariants = {
    orange: { bg: 'bg-[#F26430]', border: 'border-[#D04D19]' },
    black:  { bg: 'bg-[#1A1A1A]', border: 'border-black' },
    blue:   { bg: 'bg-[#0057FF]', border: 'border-[#0045CC]' },
    purple: { bg: 'bg-[#8B5CF6]', border: 'border-[#703FE0]' },
    teal:   { bg: 'bg-[#14B8A6]', border: 'border-[#0F8A7C]' },
    red:    { bg: 'bg-[#EF4444]', border: 'border-[#D82727]' },
    pink:   { bg: 'bg-[#EC4899]', border: 'border-[#D42D7F]' },
    green:  { bg: 'bg-[#22C55E]', border: 'border-[#1AA14A]' },
  };

  const selectedVariant = colorVariants[color];
  
  return (
    <button
      onClick={handleClick}
      className={`w-full p-6 rounded-2xl flex items-center justify-between text-left rtl:text-right relative overflow-hidden shadow-lg text-white transition-all duration-150 active:translate-y-1 border-b-4 active:border-b-0 hover:brightness-105 ${selectedVariant.bg} ${selectedVariant.border}`}
    >
      <div className="z-10">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm opacity-80 mt-1">{subtitle}</p>
      </div>
      <div className="absolute bottom-0 w-40 h-40 transform translate-y-6 opacity-90 right-0 translate-x-6 rtl:right-auto rtl:left-0 rtl:-translate-x-6">
        <img src={illustrationUrl} alt="" className="w-full h-full object-contain" />
      </div>
    </button>
  );
};

export default CategoryCard;

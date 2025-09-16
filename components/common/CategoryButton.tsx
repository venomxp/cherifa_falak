import React from 'react';

interface CategoryButtonProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientClass: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ onClick, title, description, icon, gradientClass }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full p-4 rounded-2xl text-white shadow-lg transition-transform transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-violet-400/50 ${gradientClass}`}
    >
      <div className="text-left rtl:text-right">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-xs opacity-90 mt-1">{description}</p>
      </div>
      <div className="w-20 h-12 flex-shrink-0 ml-3 rtl:ml-0 rtl:mr-3 flex items-center justify-center">
        <div className="w-full h-full text-white/90 drop-shadow-lg">
            {icon}
        </div>
      </div>
    </button>
  );
};

export default CategoryButton;
import React from 'react';

interface CategoryButtonProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ onClick, title, description, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 rounded-2xl bg-brand-light-card dark:bg-brand-light-dark border border-brand-light-border dark:border-brand-border shadow-lg transition-all transform hover:scale-[1.03] hover:border-brand-accent/50 focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
    >
      <div className="text-left rtl:text-right">
        <h3 className="text-xl font-bold text-brand-accent">{title}</h3>
        <p className="text-xs text-brand-light-text/70 dark:text-brand-text-light/70 mt-1">{description}</p>
      </div>
      <div className="w-20 h-12 flex-shrink-0 ml-3 rtl:ml-0 rtl:mr-3 flex items-center justify-center">
        <div className="w-full h-full text-brand-accent/90 drop-shadow-lg">
            {icon}
        </div>
      </div>
    </button>
  );
};

export default CategoryButton;
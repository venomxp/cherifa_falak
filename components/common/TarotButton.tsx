import React from 'react';

interface TarotButtonProps {
  onClick: () => void;
  title: string;
}

const TarotButton: React.FC<TarotButtonProps> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="w-64 h-40 bg-gray-800 border-2 border-purple-400 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-300 hover:bg-purple-900 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20"
    >
      {title}
    </button>
  );
};

export default TarotButton;

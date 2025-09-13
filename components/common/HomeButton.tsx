import React from 'react';

interface HomeButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-10 w-72 text-xl font-bold text-white rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
    >
      {children}
    </button>
  );
};

export default HomeButton;

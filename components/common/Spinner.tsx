import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8" aria-label="جاري التحميل">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
    </div>
  );
};

export default Spinner;

import React from 'react';
import { useSettings } from '../../hooks/useSettings';

const Spinner: React.FC = () => {
  const { t } = useSettings();
  return (
    <div className="flex justify-center items-center my-8" aria-label={t('loadingAria')}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
    </div>
  );
};

export default Spinner;
import React from 'react';
import Card from './Card.tsx';
import { useSettings } from '../../hooks/useSettings.tsx';

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Language Option Component
const LanguageOption: React.FC<{
  name: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}> = ({ name, icon, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center gap-4 text-left rtl:text-right transform focus:outline-none focus:ring-4 focus:ring-brand-accent/50 ${
        isSelected
          ? 'bg-brand-accent text-brand-button-text shadow-lg shadow-brand-accent/20'
          : 'bg-brand-light dark:bg-brand-dark hover:bg-black/5 dark:hover:bg-brand-border text-brand-light-text dark:text-brand-text-light hover:scale-105'
      }`}
      aria-pressed={isSelected}
    >
      <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center text-xl font-bold rounded-lg ${
          isSelected ? 'bg-black/10 text-brand-button-text' : 'bg-brand-light-border dark:bg-brand-border text-brand-accent'
      }`}>
        {icon}
      </div>
      <span className="flex-grow text-lg font-semibold">{name}</span>
      {isSelected && (
        <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-black/20 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};


const LanguagePickerModal: React.FC<LanguagePickerModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useSettings();

  if (!isOpen) return null;

  const languages = [
    { code: 'en' as const, name: 'English', icon: 'En' },
    { code: 'fr' as const, name: 'Français', icon: 'Fr' },
    { code: 'ar' as const, name: 'العربية', icon: 'ع' },
  ];
  
  const handleSelect = (langCode: 'en' | 'fr' | 'ar') => {
    setLanguage(langCode);
    onClose();
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" 
        onClick={onClose} 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="language-picker-title"
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Card className="w-full max-w-xs">
            <h3 id="language-picker-title" className="text-2xl font-bold text-center mb-6 text-brand-accent">{t('chooseLanguage')}</h3>
            <div className="space-y-3">
                {languages.map(({ code, name, icon }) => (
                     <LanguageOption
                        key={code}
                        name={name}
                        icon={<span className={code === 'ar' ? 'font-logo-ar text-2xl' : ''}>{icon}</span>}
                        isSelected={language === code}
                        onClick={() => handleSelect(code)}
                    />
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default LanguagePickerModal;
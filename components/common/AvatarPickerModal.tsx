import React from 'react';
import { AVATARS } from '../../assets/avatars.ts';
import Card from './Card.tsx';
import { useSettings } from '../../hooks/useSettings.tsx';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (id: string) => void;
}

const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({ isOpen, onClose, onSelectAvatar }) => {
  const { t } = useSettings();
  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    onSelectAvatar(id);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()}>
        <Card className="w-full max-w-md">
            <h3 className="text-3xl font-bold text-center mb-8 text-brand-accent tracking-wide">{t('chooseYourSymbol')}</h3>
            <div className="grid grid-cols-3 gap-6 place-items-center">
                {AVATARS.map(({ id, Component }) => (
                    <button 
                        key={id} 
                        onClick={() => handleSelect(id)} 
                        className="p-2 bg-brand-dark/50 rounded-full border-2 border-transparent hover:border-brand-accent focus:border-brand-accent focus:outline-none transition-all duration-200 transform hover:scale-105"
                        aria-label={`Select ${id} symbol`}
                    >
                        <Component className="w-16 h-16" />
                    </button>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default AvatarPickerModal;
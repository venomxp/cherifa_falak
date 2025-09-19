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
        <Card className="w-full max-w-sm">
            <h3 className="text-2xl font-bold text-center mb-6 text-brand-accent">{t('chooseYourSymbol')}</h3>
            <div className="flex justify-center items-center gap-4">
                {AVATARS.map(({ id, Component }) => (
                    <button 
                        key={id} 
                        onClick={() => handleSelect(id)} 
                        className="p-2 bg-brand-dark rounded-full aspect-square flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-brand-accent/20 ring-2 ring-transparent focus:outline-none focus:ring-brand-accent"
                        aria-label={`Select ${id} symbol`}
                    >
                        <Component className="w-10 h-10 text-brand-accent" />
                    </button>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default AvatarPickerModal;
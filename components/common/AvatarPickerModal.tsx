import React from 'react';
import { AVATARS } from '../../assets/avatars';
import Card from './Card';
import { useSettings } from '../../hooks/useSettings';

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
            <h3 className="text-2xl font-bold text-center mb-6 text-violet-700 dark:text-violet-300">{t('chooseYourSymbol')}</h3>
            <div className="grid grid-cols-4 gap-4">
                {AVATARS.map(({ id, Component }) => (
                    <button 
                        key={id} 
                        onClick={() => handleSelect(id)} 
                        className="p-2 bg-slate-200/50 dark:bg-slate-700/50 rounded-full aspect-square flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-violet-500/20 ring-2 ring-transparent focus:outline-none focus:ring-violet-400"
                        aria-label={`Select ${id} symbol`}
                    >
                        <Component className="w-10 h-10 text-violet-700 dark:text-violet-300" />
                    </button>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default AvatarPickerModal;

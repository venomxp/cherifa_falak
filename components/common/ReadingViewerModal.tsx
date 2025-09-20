import React from 'react';
import Card from './Card.tsx';
import Button from './Button.tsx';
import { ReadingHistoryItem } from '../../types.ts';
import { useSettings } from '../../hooks/useSettings.tsx';

interface ReadingViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  reading: ReadingHistoryItem | null;
}

const ReadingViewerModal: React.FC<ReadingViewerModalProps> = ({ isOpen, onClose, reading }) => {
  const { t, language } = useSettings();
  if (!isOpen || !reading) return null;

  const getParsedContent = (item: ReadingHistoryItem) => {
    // For specific types, content might be stored as a JSON string.
    if (item.type === 'Tarot' || item.type === 'Falk Lyom') {
      try {
        const parsedData = JSON.parse(item.content);
        // The structure seems to be { interpretation: "...", card: {...} }
        if (parsedData && typeof parsedData.interpretation === 'string') {
          return parsedData.interpretation;
        }
      } catch (error) {
        // If parsing fails, it's likely plain text. Fallback to original content.
        return item.content;
      }
    }
    // For all other types, return content as is.
    return item.content;
  };

  const contentToDisplay = getParsedContent(reading);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="reading-viewer-title"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg h-[80vh] flex flex-col">
        <Card className="flex-grow flex flex-col overflow-hidden p-4">
          <h3 id="reading-viewer-title" className="text-2xl font-bold text-center mb-4 text-brand-accent flex-shrink-0">{reading.title}</h3>
          <div className="flex-grow overflow-y-auto pr-2">
            <p className={`whitespace-pre-wrap leading-relaxed text-brand-light-text dark:text-brand-text-light ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {contentToDisplay}
            </p>
          </div>
          <div className="text-center mt-6 flex-shrink-0">
            <Button onClick={onClose} variant="secondary">{t('goBack')}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReadingViewerModal;
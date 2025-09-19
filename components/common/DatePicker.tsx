import React, { useState, useEffect, useMemo } from 'react';
import { useSettings } from '../../hooks/useSettings.tsx';
import Button from './Button.tsx';
import { triggerHapticFeedback } from '../../utils/haptics.ts';

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSet: (date: string) => void;
  onClear: () => void;
  initialDate?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, onClose, onSet, onClear, initialDate }) => {
  const { t, language } = useSettings();
  const [view, setView] = useState<'days' | 'years'>('days');
  
  const parseDate = (dateString?: string): Date => {
    if (dateString && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState<Date>(parseDate(initialDate));
  const [displayDate, setDisplayDate] = useState<Date>(parseDate(initialDate));
  
  useEffect(() => {
    const newDate = parseDate(initialDate);
    setSelectedDate(newDate);
    setDisplayDate(newDate);
  }, [initialDate]);

  const toYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSet = () => {
    onSet(toYYYYMMDD(selectedDate));
  };
  
  const handleClear = () => {
    onClear();
  };

  const daysInMonth = useMemo(() => new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate(), [displayDate]);
  const firstDayOfMonth = useMemo(() => new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay(), [displayDate]);
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => Array.from({ length: 100 }, (_, i) => currentYear - i), [currentYear]);

  const changeMonth = (delta: number) => {
    triggerHapticFeedback();
    setDisplayDate(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + delta);
        return newDate;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-brand-light dark:bg-brand-light-dark rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-brand-accent text-brand-button-text p-4">
          <button onClick={() => { triggerHapticFeedback(); setView('years'); }} className="text-lg opacity-80 hover:opacity-100 transition-opacity font-semibold">{displayDate.getFullYear()}</button>
          <p className="text-3xl font-bold">{selectedDate.toLocaleDateString(language, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
        </div>

        <div className="p-4">
          {view === 'days' && (
            <>
              {/* Month Navigator */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">&lt;</button>
                <span className="font-bold text-lg">{displayDate.toLocaleDateString(language, { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">&gt;</button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-semibold text-sm opacity-60">{d}</div>)}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === displayDate.getMonth() && selectedDate.getFullYear() === displayDate.getFullYear();
                  return (
                    <button key={day} onClick={() => setSelectedDate(new Date(displayDate.getFullYear(), displayDate.getMonth(), day))} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isSelected ? 'bg-brand-accent text-brand-button-text' : 'hover:bg-brand-accent/10'}`}>
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {view === 'years' && (
             <div className="h-72">
                 <div className="grid grid-cols-3 gap-2 h-full overflow-y-auto text-center">
                    {years.map(year => (
                        <button key={year} onClick={() => { setDisplayDate(new Date(year, displayDate.getMonth(), 1)); setView('days'); }} 
                        className={`p-3 rounded-lg font-semibold ${displayDate.getFullYear() === year ? 'bg-brand-accent text-brand-button-text' : 'hover:bg-brand-accent/10'}`}>
                            {year}
                        </button>
                    ))}
                </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-brand-light-border dark:border-brand-border">
          <Button onClick={handleClear} variant="secondary">{t('clear')}</Button>
          <Button onClick={onClose} variant="secondary">{t('cancel')}</Button>
          <Button onClick={handleSet}>{t('set')}</Button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

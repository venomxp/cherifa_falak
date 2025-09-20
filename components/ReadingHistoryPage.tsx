import React, { useState } from 'react';
import { Page, ReadingHistoryItem, ReadingType, TranslationKey } from '../types.ts';
import { useSettings } from '../hooks/useSettings.tsx';
import Button from './common/Button.tsx';
import Card from './common/Card.tsx';
import ReadingViewerModal from './common/ReadingViewerModal.tsx';
import { triggerHapticFeedback } from '../utils/haptics.ts';
import { getAvatarById } from '../assets/avatars.ts';

// --- SVG Icons ---
const TarotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
const NumerologyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>;
const CompatibilityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
const HoroscopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
const GematriaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm-9-6h.008v.008H6v-.008zm0 3h.008v.008H6v-.008zm0 3h.008v.008H6v-.008zM4.5 6.75v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75z" /></svg>;
const TrashIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);


interface ReadingHistoryPageProps {
  setPage: (page: Page) => void;
  goBack: () => void;
}

const ReadingHistoryPage: React.FC<ReadingHistoryPageProps> = ({ setPage, goBack }) => {
    const { t, readingHistory, removeReadingFromHistory, userName, profilePic } = useSettings();
    const [viewingReading, setViewingReading] = useState<ReadingHistoryItem | null>(null);

    const AvatarComponent = getAvatarById(profilePic);

    const getIconForReadingType = (type: ReadingType) => {
        switch (type) {
            case 'Tarot':
            case 'Falk Lyom':
            case 'Tale\'e':
                return <TarotIcon />;
            case 'Numerology':
                return <NumerologyIcon />;
            case 'Compatibility':
                return <CompatibilityIcon />;
            case 'Horoscope':
                return <HoroscopeIcon />;
            case 'Gematria':
                return <GematriaIcon />;
            default:
                return null;
        }
    };

     const getTranslationKeyForType = (type: ReadingType): TranslationKey => {
        switch (type) {
            case 'Tarot': return 'readingTypeTarot';
            case 'Numerology': return 'readingTypeNumerology';
            case 'Compatibility': return 'readingTypeCompatibility';
            case 'Horoscope': return 'readingTypeHoroscope';
            case 'Falk Lyom': return 'readingTypeFalkLyom';
            case 'Tale\'e': return 'readingTypeTalee';
            case 'Gematria': return 'readingTypeGematria';
            default: return 'tarotReading'; // Fallback
        }
    };

    const handleDeleteReading = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        triggerHapticFeedback();
        removeReadingFromHistory(id);
    };

    const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center animate-fade-in box-border pb-12">
             <div className="flex flex-col items-center my-8 text-center">
                {AvatarComponent && (
                    <div className="w-24 h-24 mb-4 rounded-full bg-slate-200/50 dark:bg-black/30 p-1 ring-2 ring-slate-300 dark:ring-white/20 shadow-lg">
                        <div className="w-full h-full bg-brand-light dark:bg-brand-light-dark/50 rounded-full overflow-hidden">
                            <AvatarComponent className="w-full h-full" />
                        </div>
                    </div>
                )}
                <h1 className="text-4xl font-bold text-brand-light-text dark:text-brand-text-light">{userName}</h1>
                <h2 className="text-xl font-logo-en text-brand-accent tracking-wider mt-1">{t('readingHistoryTitle')}</h2>
            </div>
            <div className="w-full max-w-lg space-y-3">
                {readingHistory.length === 0 ? (
                    <Card className="text-center p-8 flex flex-col items-center">
                        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent/50 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                        </div>
                        <p className="text-xl font-bold">{t('noReadingsYet')}</p>
                        <p className="text-brand-light-text/70 dark:text-brand-text-light/70 mt-2 max-w-xs">{t('noReadingsYetBody')}</p>
                    </Card>
                ) : (
                    readingHistory.map(reading => (
                        <div key={reading.id} className="flex items-stretch gap-2 animate-fade-in">
                            <button
                                onClick={() => { triggerHapticFeedback(); setViewingReading(reading); }}
                                className="group flex-grow text-left rtl:text-right p-4 rounded-xl bg-brand-light-card dark:bg-brand-light-dark hover:bg-brand-accent/5 dark:hover:bg-brand-border transition-all duration-200 flex items-center gap-4 border border-brand-light-border dark:border-brand-border shadow-md hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-brand-accent/10 dark:bg-brand-accent/20 text-brand-accent transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                                    {getIconForReadingType(reading.type)}
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-bold text-lg text-brand-light-text dark:text-brand-text-light truncate">{reading.title}</p>
                                    <p className="text-sm text-brand-light-text/70 dark:text-brand-text-light/70 mt-1">
                                        {`${t(getTranslationKeyForType(reading.type))} • ${formatDate(reading.date)}`}
                                    </p>
                                </div>
                            </button>
                            <button
                                onClick={(e) => handleDeleteReading(e, reading.id)}
                                className="p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 flex-shrink-0 transition-colors h-full border border-red-500/10 hover:border-red-500/30"
                                aria-label={`Delete reading: ${reading.title}`}
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 text-center">
                <Button onClick={goBack} variant="secondary">
                    &larr; {t('profile')}
                </Button>
            </div>
             <ReadingViewerModal
                isOpen={!!viewingReading}
                onClose={() => setViewingReading(null)}
                reading={viewingReading}
            />
        </div>
    );
};

export default ReadingHistoryPage;
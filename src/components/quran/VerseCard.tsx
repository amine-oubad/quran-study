import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Bookmark, StickyNote, X, Check } from 'lucide-react';
import { useReadingStore } from '@/stores/useReadingStore';
import type { Verse } from '@/data/types';
import { cn } from '@/lib/utils';
import VerseCommentaryPanel from './VerseCommentary';

interface VerseCardProps {
  verse: Verse;
  hizbNumber?: number;
}

export default function VerseCard({ verse, hizbNumber }: VerseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { displayMode, toggleBookmark, isBookmarked } = useReadingStore();
  const { verseNotes, setVerseNote, deleteVerseNote } = useReadingStore();
  const setLastRead = useReadingStore((s) => s.setLastRead);
  const cardRef = useRef<HTMLElement>(null);

  // Track reading progress via IntersectionObserver
  useEffect(() => {
    if (!hizbNumber || !cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLastRead(hizbNumber, verse.key);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hizbNumber, verse.key, setLastRead]);
  const bookmarked = isBookmarked(verse.key);
  const existingNote = verseNotes[verse.key];

  const handleOpenNote = () => {
    setNoteText(existingNote || '');
    setNoteOpen(true);
  };

  const handleSaveNote = () => {
    const trimmed = noteText.trim();
    if (trimmed) {
      setVerseNote(verse.key, trimmed);
    } else {
      deleteVerseNote(verse.key);
    }
    setNoteOpen(false);
  };

  const renderText = () => {
    switch (displayMode) {
      case 'arabic':
        return (
          <p className="quran-arabic" lang="ar" dir="rtl">
            {verse.textArabic}
          </p>
        );
      case 'transliteration':
        return <p className="quran-transliteration">{verse.transliteration}</p>;
      case 'french':
      default:
        return <p className="quran-french">{verse.textFrench}</p>;
    }
  };

  return (
    <article ref={cardRef} className="animate-fade-in group rounded-xl border border-border-soft bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* En-tête du verset */}
      <div className="flex items-start justify-between border-b border-border-soft/50 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          {/* Badge numéro */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {verse.verseNumber}
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">
              {verse.surahName} — v.{verse.verseNumber}
            </span>
            <span className="text-xs text-gray-400" dir="rtl" lang="ar">
              {verse.surahNameArabic}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(verse.key)}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              bookmarked
                ? 'text-gold hover:text-gold-light'
                : 'text-gray-300 hover:text-gray-500'
            )}
            aria-label={bookmarked ? 'Retirer le marque-page' : 'Marquer ce verset'}
          >
            <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Note contextuelle */}
          <button
            onClick={handleOpenNote}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              existingNote
                ? 'text-amber-500 hover:text-amber-600'
                : 'text-gray-300 hover:text-gray-500'
            )}
            aria-label={existingNote ? 'Modifier la note' : 'Ajouter une note'}
          >
            <StickyNote size={18} fill={existingNote ? 'currentColor' : 'none'} />
          </button>

          {/* Expand commentary */}
          {verse.commentary && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-primary/70 transition-colors hover:bg-warm hover:text-primary"
            >
              <span className="hidden sm:inline">
                {expanded ? 'Réduire' : 'Tafsir'}
              </span>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Texte du verset */}
      <div className="px-4 py-4 sm:px-5">
        {renderText()}
      </div>

      {/* Note contextuelle existante (aperçu) */}
      {existingNote && !noteOpen && (
        <div className="border-t border-amber-100 bg-amber-50/50 px-4 py-2 sm:px-5">
          <p className="text-xs text-amber-700 italic line-clamp-2">{existingNote}</p>
        </div>
      )}

      {/* Éditeur de note contextuelle */}
      {noteOpen && (
        <div className="border-t border-amber-200 bg-amber-50/70 px-4 py-3 sm:px-5">
          <textarea
            autoFocus
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Votre note personnelle sur ce verset..."
            className="w-full resize-none rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-amber-400 focus:outline-none"
            rows={3}
          />
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              onClick={() => setNoteOpen(false)}
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-100"
            >
              <X size={14} /> Annuler
            </button>
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-1 rounded-md bg-amber-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-amber-600"
            >
              <Check size={14} /> Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* Panneau commentaire dépliable */}
      {expanded && verse.commentary && (
        <VerseCommentaryPanel commentary={verse.commentary} verseKey={verse.key} />
      )}
    </article>
  );
}

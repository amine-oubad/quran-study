import { BookOpen, MessageSquareQuote, AlertTriangle } from 'lucide-react';
import type { VerseCommentary, VerseKey } from '@/data/types';
import { CLOSING_FORMULA } from '@/lib/utils';

interface Props {
  commentary: VerseCommentary;
  verseKey: VerseKey;
}

export default function VerseCommentaryPanel({ commentary }: Props) {
  return (
    <div className="animate-fade-in border-t border-border-soft bg-warm/50 px-4 py-5 sm:px-5">
      {/* Contexte */}
      {commentary.context && (
        <div className="mb-4">
          <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookOpen size={14} />
            Contexte
          </h4>
          <p className="text-sm leading-relaxed text-gray-700">{commentary.context}</p>
        </div>
      )}

      {/* Références de tafsir */}
      {commentary.tafsirReferences.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <MessageSquareQuote size={14} />
            Exégèse
          </h4>
          <div className="space-y-2.5">
            {commentary.tafsirReferences.map((ref, i) => (
              <div
                key={i}
                className="rounded-lg border-l-[3px] border-primary/30 bg-white py-2.5 pl-4 pr-3"
              >
                <p className="text-sm leading-relaxed text-gray-700">{ref.text}</p>
                <p className="mt-1.5 text-xs text-gray-400">
                  — <span className="font-medium text-primary/70">{ref.scholar}</span>
                  {ref.source && <span> ({ref.source})</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nuances */}
      {commentary.nuances.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Nuances d'interprétation
          </h4>
          <ul className="space-y-1.5">
            {commentary.nuances.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Divergences */}
      {commentary.divergences && commentary.divergences.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600">
            <AlertTriangle size={14} />
            Divergences
          </h4>
          <ul className="space-y-1.5">
            {commentary.divergences.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hadiths liés */}
      {commentary.relatedHadiths && commentary.relatedHadiths.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Hadiths liés
          </h4>
          {commentary.relatedHadiths.map((h, i) => (
            <div key={i} className="mb-2 rounded-lg bg-white p-3 text-sm">
              <p className="leading-relaxed text-gray-700">« {h.text} »</p>
              <p className="mt-1.5 text-xs text-gray-400">
                {h.narrator && <span>Rapporté par {h.narrator} — </span>}
                <span className="font-medium">{h.collection}</span>, n°{h.number}
                {' '}
                <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                  {h.grade}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Formule de clôture */}
      <p className="mt-3 border-t border-border-soft pt-3 text-center text-xs italic text-gray-400">
        {CLOSING_FORMULA}
      </p>
    </div>
  );
}

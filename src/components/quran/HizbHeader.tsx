import { Clock, BookOpenText, ScrollText } from 'lucide-react';
import type { Hizb } from '@/data/types';
import { formatHizbNumber } from '@/lib/utils';

interface Props {
  hizb: Hizb;
}

function EnrichmentStats({ hizb }: Props) {
  const totalVerses = hizb.verses.length;
  const withTafsir = hizb.verses.filter((v) => v.commentary).length;
  const hasSynthesis = !!hizb.synthesis;

  if (withTafsir === 0 && !hasSynthesis) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {withTafsir > 0 && (
        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
          <BookOpenText size={14} className="text-primary" />
          <span className="text-xs font-medium text-primary">
            {withTafsir}/{totalVerses} versets avec tafsir
          </span>
        </div>
      )}
      {hasSynthesis && (
        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
          <ScrollText size={14} className="text-primary" />
          <span className="text-xs font-medium text-primary">Synthèse disponible</span>
        </div>
      )}
    </div>
  );
}

export default function HizbHeader({ hizb }: Props) {
  return (
    <section className="mb-8">
      {/* Bannière titre */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-primary-light px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
        {/* Motif décoratif */}
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />

        <div className="relative">
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-white/70">
            {formatHizbNumber(hizb.number)}
          </p>
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{hizb.title}</h1>
          <p className="text-sm text-white/80">
            {hizb.surahsCovered.join(' • ')}
          </p>
          <EnrichmentStats hizb={hizb} />
        </div>
      </div>

      {/* Contexte général ou badge "en préparation" */}
      {hizb.context ? (
        <div className="mt-6 rounded-xl border border-border-soft bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-3 text-base font-semibold text-primary">Contexte général</h2>
          <p className="text-sm leading-relaxed text-gray-700">{hizb.context}</p>

          {hizb.linkWithPrevious && (
            <div className="mt-4 rounded-lg bg-warm p-3">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Lien avec ce qui précède
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{hizb.linkWithPrevious}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-amber-700">
            <Clock size={15} />
            <p className="text-sm font-medium">Commentaire en cours de préparation, insha'Allah.</p>
          </div>
          <p className="mt-1 text-xs text-amber-600">
            Les versets sont disponibles ci-dessous. L'analyse contextuelle et l'exégèse seront
            ajoutées progressivement, avec rigueur et sourçage.
          </p>
        </div>
      )}

      {/* Analyse des passages */}
      {hizb.passageAnalysis && hizb.passageAnalysis.length > 0 && (
        <div className="mt-4 rounded-xl border border-border-soft bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-base font-semibold text-primary">
            Aperçu des passages
          </h2>
          <div className="space-y-3">
            {hizb.passageAnalysis.map((passage, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">{passage.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
                    {passage.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

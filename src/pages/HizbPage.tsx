import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import { getHizbData, hizbList } from '@/data/hizb';
import type { Hizb } from '@/data/types';
import HizbHeader from '@/components/quran/HizbHeader';
import VerseCard from '@/components/quran/VerseCard';
import DisplayModeToggle from '@/components/quran/DisplayModeToggle';
import HizbSynthesis from '@/components/quran/HizbSynthesis';

export default function HizbPage() {
  const { hizbId } = useParams();
  const hizbNumber = parseInt(hizbId || '1');
  const [hizb, setHizb] = useState<Hizb | null | undefined>(undefined);

  useEffect(() => {
    setHizb(undefined);
    getHizbData(hizbNumber).then((data) => setHizb(data ?? null));
  }, [hizbNumber]);

  // Update document title when hizb loads
  useEffect(() => {
    if (hizb) document.title = `${hizb.title} — Quran Study`;
  }, [hizb]);

  // Loading
  if (hizb === undefined) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Loader2 size={32} className="mb-4 animate-spin text-primary" />
        <p className="text-sm text-gray-500">Chargement du hizb…</p>
      </div>
    );
  }

  // Not found
  if (hizb === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="mb-2 text-6xl">📖</p>
        <h2 className="mb-2 text-xl font-semibold text-gray-800">Hizb non disponible</h2>
        <p className="mb-6 text-sm text-gray-500">
          Les données de ce hizb ne sont pas encore prêtes.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white no-underline hover:bg-primary-light"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Navigation prev/next
  const prevHizb = hizbList.find((h) => h.number === hizbNumber - 1 && h.available);
  const nextHizb = hizbList.find((h) => h.number === hizbNumber + 1 && h.available);

  return (
    <div className="animate-fade-in pb-12">
      {/* En-tête du hizb */}
      <HizbHeader hizb={hizb} />

      {/* Barre mode d'affichage */}
      <div className="sticky top-16 z-30 mb-6 flex items-center justify-between rounded-xl border border-border-soft bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-gray-500">
          {hizb.verses.length} versets
        </h2>
        <DisplayModeToggle />
      </div>

      {/* Liste des versets (virtualisée) */}
      <Virtuoso
        useWindowScroll
        data={hizb.verses}
        itemContent={(_index, verse) => (
          <div className="pb-4">
            <VerseCard verse={verse} hizbNumber={hizb.number} />
          </div>
        )}
      />

      {/* Synthèse de fin — uniquement si disponible */}
      {hizb.synthesis && (
        <HizbSynthesis synthesis={hizb.synthesis} hizbNumber={hizb.number} />
      )}

      {/* Navigation prev/next */}
      <nav className="mt-10 flex items-center justify-between">
        {prevHizb ? (
          <Link
            to={`/hizb/${prevHizb.number}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-medium text-gray-600 no-underline transition-colors hover:bg-warm hover:text-primary"
          >
            <ArrowLeft size={16} />
            Hizb {prevHizb.number}
          </Link>
        ) : (
          <div />
        )}
        {nextHizb ? (
          <Link
            to={`/hizb/${nextHizb.number}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-medium text-gray-600 no-underline transition-colors hover:bg-warm hover:text-primary"
          >
            Hizb {nextHizb.number}
            <ArrowRight size={16} />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}

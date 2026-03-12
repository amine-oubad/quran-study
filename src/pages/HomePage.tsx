import { useEffect } from 'react';
import { Link } from 'react-router';
import { BookOpen, ChevronRight, Compass, GraduationCap, PlayCircle, Shield } from 'lucide-react';
import { hizbList } from '@/data/hizb';
import { useReadingStore } from '@/stores/useReadingStore';
import { formatVerseKey } from '@/lib/utils';

export default function HomePage() {
  useEffect(() => { document.title = 'Quran Study — Étude structurée du Coran par hizb'; }, []);
  const availableHizbs = hizbList.filter((h) => h.available);
  const { lastReadHizb, lastReadVerse } = useReadingStore();

  return (
    <div className="animate-fade-in">
      {/* Reprendre la lecture */}
      {lastReadHizb && lastReadVerse && (
        <section className="mb-6">
          <Link
            to={`/hizb/${lastReadHizb}`}
            className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 no-underline transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <PlayCircle size={24} className="text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                Reprendre la lecture
              </span>
              <span className="text-xs text-gray-500">
                Hizb {lastReadHizb} — {formatVerseKey(lastReadVerse)}
              </span>
            </div>
            <ChevronRight size={18} className="ml-auto text-primary/50" />
          </Link>
        </section>
      )}

      {/* Hero */}
      <section className="mb-10 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <BookOpen size={16} className="text-primary" />
            <span className="text-xs font-medium text-primary">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</span>
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Étude du Coran par <span className="text-primary">Hizb</span>
          </h1>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-500">
            Une approche rigoureuse, structurée et pédagogique pour étudier le Coran.
            Traduction française, texte arabe, phonétique et exégèse sourcée.
          </p>
        </div>
      </section>

      {/* Principes méthodologiques */}
      <section className="mb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <PrincipleCard
            icon={<Shield size={20} />}
            title="Rigueur"
            description="Exégèse issue d'Ibn Kathir, At-Tabari, Al-Qurtubi et As-Sa'di. Aucune interprétation personnelle."
          />
          <PrincipleCard
            icon={<GraduationCap size={20} />}
            title="Pédagogie"
            description="Chaque hizb est contextualisé, analysé et synthétisé. Les versets sont commentés individuellement."
          />
          <PrincipleCard
            icon={<Compass size={20} />}
            title="Prudence"
            description="Distinction claire entre texte, tafsir et déduction. Les divergences sont signalées."
          />
        </div>
      </section>

      {/* Liste des hizbs disponibles */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Commencer l'étude
        </h2>

        {availableHizbs.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {availableHizbs.map((hizb) => (
              <Link
                key={hizb.number}
                to={`/hizb/${hizb.number}`}
                className="group flex items-center justify-between rounded-xl border border-border-soft bg-white p-4 no-underline shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {hizb.number}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Hizb {hizb.number}
                    </h3>
                    <p className="text-xs text-gray-400">{hizb.surahsCovered}</p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-gray-300 transition-colors group-hover:text-primary"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border-soft p-8 text-center text-gray-400">
            <p>Les données sont en cours de préparation.</p>
          </div>
        )}

        {/* Info exégèse */}
        <div className="mt-6 rounded-xl border border-dashed border-border-soft bg-warm/50 p-6 text-center">
          <p className="text-sm text-gray-500">
            Les 60 ahzab sont disponibles avec texte arabe, traduction et phonétique.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            L'exégèse sourçée est ajoutée progressivement, avec rigueur et vérification, insha'Allah.
          </p>
        </div>
      </section>
    </div>
  );
}

function PrincipleCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border-soft bg-white p-5 shadow-sm">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-gray-800">{title}</h3>
      <p className="text-xs leading-relaxed text-gray-500">{description}</p>
    </div>
  );
}

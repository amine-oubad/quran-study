import {
  Lightbulb,
  Scale,
  Heart,
  CheckCircle2,
  Star,
  AlertCircle,
} from 'lucide-react';
import type { HizbSynthesis as HizbSynthesisType } from '@/data/types';
import {
  CLOSING_FORMULA,
  SPECIAL_MENTION_LABELS,
  SPECIAL_MENTION_ICONS,
} from '@/lib/utils';

interface Props {
  synthesis: HizbSynthesisType;
  hizbNumber: number;
}

export default function HizbSynthesis({ synthesis, hizbNumber }: Props) {
  return (
    <section className="mt-10">
      {/* Séparateur */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">
          Synthèse — Hizb {hizbNumber}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      <div className="space-y-5">
        {/* Analyse théologique */}
        <SynthesisCard
          icon={<Lightbulb size={18} className="text-primary" />}
          title="Analyse théologique"
          content={synthesis.theological}
        />

        {/* Analyse juridique */}
        {synthesis.juridical && (
          <SynthesisCard
            icon={<Scale size={18} className="text-primary" />}
            title="Analyse juridique"
            content={synthesis.juridical}
          />
        )}

        {/* Analyse spirituelle */}
        <SynthesisCard
          icon={<Heart size={18} className="text-primary" />}
          title="Analyse spirituelle"
          content={synthesis.spiritual}
        />

        {/* Actions concrètes */}
        <div className="rounded-xl border border-border-soft bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-primary">
            <CheckCircle2 size={18} />
            Actions concrètes
          </h3>
          <ul className="space-y-2">
            {synthesis.actions.map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-gray-700">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Versets à mémoriser */}
        <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-white to-warm p-5 shadow-sm sm:p-6">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gold">
            <Star size={18} fill="currentColor" />
            Versets à mémoriser
          </h3>
          <div className="space-y-2.5">
            {synthesis.versesToMemorize.map((v, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg bg-white p-3 text-sm"
              >
                <span className="shrink-0 rounded bg-gold/10 px-2 py-0.5 text-xs font-semibold text-gold">
                  {v.key}
                </span>
                <span className="leading-relaxed text-gray-600">{v.reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mentions spéciales */}
        {synthesis.specialMentions.length > 0 && (
          <div className="rounded-xl border border-border-soft bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-800">
              <AlertCircle size={18} className="text-amber-500" />
              Mentions spéciales
            </h3>
            <div className="space-y-3">
              {synthesis.specialMentions.map((mention, i) => (
                <div
                  key={i}
                  className="rounded-lg border-l-[3px] border-amber-400 bg-warm py-3 pl-4 pr-3"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span>{SPECIAL_MENTION_ICONS[mention.type]}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {SPECIAL_MENTION_LABELS[mention.type]}
                    </span>
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-800">
                    {mention.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600">{mention.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Clôture */}
      <div className="mt-8 rounded-xl border border-primary/10 bg-primary/5 p-4 text-center">
        <p className="text-sm font-medium italic text-primary/80">{CLOSING_FORMULA}</p>
      </div>
    </section>
  );
}

/* --- Composant utilitaire --- */
function SynthesisCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-xl border border-border-soft bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-primary">
        {icon}
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-700">{content}</p>
    </div>
  );
}

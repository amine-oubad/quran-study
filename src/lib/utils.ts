/** Combine des classes CSS conditionnellement */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Formule de clôture religieuse */
export const CLOSING_FORMULA = 'Allah sait mieux. (واللهُ أَعلَم)';

/** Labels pour les types de mentions spéciales */
export const SPECIAL_MENTION_LABELS: Record<string, string> = {
  misunderstood: 'Passage souvent mal compris',
  divergence: 'Divergence classique',
  central: 'Verset central',
  connection: 'Lien avec le reste du Coran',
};

/** Icône emoji pour les types de mentions spéciales */
export const SPECIAL_MENTION_ICONS: Record<string, string> = {
  misunderstood: '⚠️',
  divergence: '📋',
  central: '⭐',
  connection: '🔗',
};

/** Formater un numéro de hizb */
export function formatHizbNumber(n: number): string {
  return `Hizb ${n}`;
}

/** Formater une clé de verset pour l'affichage */
export function formatVerseKey(key: string): string {
  const [surah, verse] = key.split(':');
  return `Sourate ${surah}, verset ${verse}`;
}

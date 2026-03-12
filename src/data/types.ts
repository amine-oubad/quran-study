/* ===== TYPES PRINCIPAUX — Quran Study ===== */

/** Mode d'affichage du texte */
export type DisplayMode = 'french' | 'arabic' | 'transliteration';

/** Référence à un verset (ex: "2:255") */
export type VerseKey = string;

/** Référence de tafsir */
export interface TafsirReference {
  scholar: string;        // "Ibn Kathir", "Al-Qurtubi", etc.
  text: string;           // Résumé ou citation
  source: string;         // Référence précise (livre, tome, page)
}

/** Référence de hadith */
export interface HadithReference {
  collection: string;     // "Sahih al-Bukhari", "Sahih Muslim"
  number: string;         // Numéro du hadith
  narrator?: string;      // Rapporteur
  text: string;           // Texte du hadith
  grade: string;          // "Sahih" (authentique)
}

/** Commentaire détaillé d'un verset */
export interface VerseCommentary {
  context: string;                       // Contexte utile
  tafsirReferences: TafsirReference[];   // Avis d'exégètes
  nuances: string[];                     // Nuances d'interprétation admises
  divergences?: string[];                // Divergences importantes
  relatedHadiths?: HadithReference[];    // Hadiths liés
}

/** Un verset du Coran */
export interface Verse {
  surahNumber: number;
  surahName: string;         // Nom de la sourate en français
  surahNameArabic: string;   // Nom en arabe
  verseNumber: number;
  key: VerseKey;             // "2:1", "2:2", etc.
  textArabic: string;
  textFrench: string;
  transliteration: string;
  commentary?: VerseCommentary;
}

/** Type de mention spéciale */
export type SpecialMentionType =
  | 'misunderstood'  // Passage souvent mal compris
  | 'divergence'     // Divergence classique importante
  | 'central'        // Verset central du hizb
  | 'connection';    // Articulation forte avec le reste du Coran

/** Mention spéciale */
export interface SpecialMention {
  type: SpecialMentionType;
  title: string;
  content: string;
  verseKey?: VerseKey;
}

/** Synthèse de fin de hizb */
export interface HizbSynthesis {
  theological: string;
  juridical?: string;
  spiritual: string;
  actions: string[];
  versesToMemorize: {
    key: VerseKey;
    reason: string;
  }[];
  specialMentions: SpecialMention[];
}

/** Structure complète d'un Hizb */
export interface Hizb {
  number: number;
  title: string;                // Titre descriptif
  surahsCovered: string[];      // Sourates concernées
  context?: string;             // Contexte général (optionnel — à enrichir progressivement)
  linkWithPrevious?: string;    // Lien avec le hizb précédent (optionnel)
  passageAnalysis?: {
    title: string;
    content: string;
  }[];                          // Analyse des passages (optionnel)
  verses: Verse[];
  synthesis?: HizbSynthesis;    // Synthèse (optionnel — à enrichir progressivement)
}

/** Note de l'utilisateur */
export interface UserNote {
  id: string;
  content: string;
  verseKey?: VerseKey;
  hizbNumber?: number;
  createdAt: string;
  updatedAt: string;
}

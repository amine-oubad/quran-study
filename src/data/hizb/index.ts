import type { Hizb } from '../types';

/** Métadonnées de tous les hizbs pour la sidebar */
export interface HizbListItem {
  number: number;
  surahsCovered: string;
  available: boolean;
}

/** Liste complète des 60 hizbs */
export const hizbList: HizbListItem[] = [
  { number: 1,  surahsCovered: 'Al-Fatiha + Al-Baqara (1-74)',                available: true },
  { number: 2,  surahsCovered: 'Al-Baqara (75-141)',                           available: true },
  { number: 3,  surahsCovered: 'Al-Baqara (142-202)',                          available: true },
  { number: 4,  surahsCovered: 'Al-Baqara (203-252)',                          available: true },
  { number: 5,  surahsCovered: 'Al-Baqara (253-286) + Al-Imran (1-14)',        available: true },
  { number: 6,  surahsCovered: 'Al-Imran (15-92)',                             available: true },
  { number: 7,  surahsCovered: 'Al-Imran (93-170)',                            available: true },
  { number: 8,  surahsCovered: "Al-Imran (171-200) + An-Nisa (1-23)",          available: true },
  { number: 9,  surahsCovered: 'An-Nisa (24-87)',                              available: true },
  { number: 10, surahsCovered: 'An-Nisa (88-147)',                             available: true },
  { number: 11, surahsCovered: "An-Nisa (148-176) + Al-Ma'ida (1-26)",         available: true },
  { number: 12, surahsCovered: "Al-Ma'ida (27-81)",                            available: true },
  { number: 13, surahsCovered: "Al-Ma'ida (82-120) + Al-An'am (1-35)",         available: true },
  { number: 14, surahsCovered: "Al-An'am (36-110)",                            available: true },
  { number: 15, surahsCovered: "Al-An'am (111-165)",                           available: true },
  { number: 16, surahsCovered: "Al-A'raf (1-87)",                              available: true },
  { number: 17, surahsCovered: "Al-A'raf (88-170)",                            available: true },
  { number: 18, surahsCovered: "Al-A'raf (171-206) + Al-Anfal (1-40)",         available: true },
  { number: 19, surahsCovered: 'Al-Anfal (41-75) + At-Tawbah (1-33)',          available: true },
  { number: 20, surahsCovered: 'At-Tawbah (34-92)',                            available: true },
  { number: 21, surahsCovered: 'At-Tawbah (93-129) + Yunus (1-25)',            available: true },
  { number: 22, surahsCovered: 'Yunus (26-109) + Hud (1-5)',                   available: true },
  { number: 23, surahsCovered: 'Hud (6-83)',                                   available: true },
  { number: 24, surahsCovered: 'Hud (84-123) + Yusuf (1-52)',                  available: true },
  { number: 25, surahsCovered: 'Yusuf (53-111) + Ar-Ra\'d (1-18)',             available: true },
  { number: 26, surahsCovered: "Ar-Ra'd (19-43) + Ibrahim (1-52)",             available: true },
  { number: 27, surahsCovered: 'Al-Hijr (1-99) + An-Nahl (1-50)',              available: true },
  { number: 28, surahsCovered: 'An-Nahl (51-128)',                             available: true },
  { number: 29, surahsCovered: "Al-Isra' (1-98)",                              available: true },
  { number: 30, surahsCovered: "Al-Isra' (99-111) + Al-Kahf (1-74)",           available: true },
  { number: 31, surahsCovered: 'Al-Kahf (75-110) + Maryam (1-98)',             available: true },
  { number: 32, surahsCovered: 'Ta-Ha (1-135)',                                available: true },
  { number: 33, surahsCovered: "Al-Anbiya' (1-112)",                           available: true },
  { number: 34, surahsCovered: 'Al-Hajj (1-78)',                               available: true },
  { number: 35, surahsCovered: "Al-Mu'minun (1-118) + An-Nur (1-20)",          available: true },
  { number: 36, surahsCovered: "An-Nur (21-64) + Al-Furqan (1-20)",            available: true },
  { number: 37, surahsCovered: "Al-Furqan (21-77) + Ash-Shu'ara (1-110)",      available: true },
  { number: 38, surahsCovered: "Ash-Shu'ara (111-227) + An-Naml (1-55)",       available: true },
  { number: 39, surahsCovered: "An-Naml (56-93) + Al-Qasas (1-50)",            available: true },
  { number: 40, surahsCovered: "Al-Qasas (51-88) + Al-'Ankabut (1-45)",        available: true },
  { number: 41, surahsCovered: "Al-'Ankabut (46-69) + Ar-Rum (1-60) + Luqman (1-21)", available: true },
  { number: 42, surahsCovered: 'Luqman (22-34) + As-Sajda (1-30) + Al-Ahzab (1-30)', available: true },
  { number: 43, surahsCovered: 'Al-Ahzab (31-73) + Saba (1-23)',               available: true },
  { number: 44, surahsCovered: "Saba (24-54) + Fatir (1-45) + Ya-Sin (1-27)",  available: true },
  { number: 45, surahsCovered: "Ya-Sin (28-83) + As-Saffat (1-144)",           available: true },
  { number: 46, surahsCovered: "As-Saffat (145-182) + Sad (1-88) + Az-Zumar (1-31)", available: true },
  { number: 47, surahsCovered: 'Az-Zumar (32-75) + Ghafir (1-40)',             available: true },
  { number: 48, surahsCovered: 'Ghafir (41-85) + Fussilat (1-46)',             available: true },
  { number: 49, surahsCovered: "Fussilat (47-54) + Ash-Shura (1-53) + Az-Zukhruf (1-23)", available: true },
  { number: 50, surahsCovered: "Az-Zukhruf (24-89) + Ad-Dukhan (1-59) + Al-Jathiya (1-37)", available: true },
  { number: 51, surahsCovered: 'Al-Ahqaf (1-35) + Muhammad (1-38) + Al-Fath (1-17)', available: true },
  { number: 52, surahsCovered: 'Al-Fath (18-29) + Al-Hujurat (1-18) + Qaf (1-45) + Adh-Dhariyat (1-30)', available: true },
  { number: 53, surahsCovered: "Adh-Dhariyat (31-60) + At-Tur (1-49) + An-Najm (1-62) + Al-Qamar (1-55)", available: true },
  { number: 54, surahsCovered: "Ar-Rahman (1-78) + Al-Waqi'a (1-96) + Al-Hadid (1-29)", available: true },
  { number: 55, surahsCovered: "Al-Mujadala (1-22) + Al-Hashr (1-24) + Al-Mumtahana (1-13) + As-Saf (1-14)", available: true },
  { number: 56, surahsCovered: "Al-Jumu'a (1-11) + Al-Munafiqun (1-11) + At-Taghabun (1-18) + At-Talaq (1-12) + At-Tahrim (1-12)", available: true },
  { number: 57, surahsCovered: "Al-Mulk (1-30) + Al-Qalam (1-52) + Al-Haqqa (1-52) + Al-Ma'arij (1-44) + Nuh (1-28)", available: true },
  { number: 58, surahsCovered: "Al-Jinn (1-28) + Al-Muzzammil (1-20) + Al-Muddaththir (1-56) + Al-Qiyama (1-40) + Al-Insan (1-31) + Al-Mursalat (1-50)", available: true },
  { number: 59, surahsCovered: "An-Naba' (1-40) + An-Nazi'at (1-46) + Abasa (1-42) + At-Takwir (1-29) + Al-Infitar (1-19) + Al-Mutaffifin (1-36) + Al-Inshiqaq (1-25) + Al-Buruj (1-22) + At-Tariq (1-17)", available: true },
  { number: 60, surahsCovered: "Al-A'la → An-Nas (87-114)",                   available: true },
];

/** Chargement dynamique d'un hizb (code splitting) */
const hizbLoaders: Record<number, () => Promise<{ default: Hizb } | Hizb>> = {};
for (let i = 1; i <= 60; i++) {
  const num = String(i).padStart(2, '0');
  hizbLoaders[i] = () =>
    import(`./hizb-${num}.ts`).then((m) => m[`hizb${num}`] as Hizb);
}

/** Cache mémoire pour éviter de re-importer */
const hizbCache: Map<number, Hizb> = new Map();

/** Récupérer les données d'un hizb par son numéro (async, lazy loaded) */
export async function getHizbData(number: number): Promise<Hizb | undefined> {
  if (hizbCache.has(number)) return hizbCache.get(number);

  const loader = hizbLoaders[number];
  if (!loader) return undefined;

  const data = await loader();
  hizbCache.set(number, data as Hizb);
  return data as Hizb;
}

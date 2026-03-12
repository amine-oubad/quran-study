/**
 * Script de génération des données des 60 hizbs
 * Source : AlQuran Cloud API (https://alquran.cloud/api)
 * Traduction : Muhammad Hamidullah (fr.hamidullah)
 * Texte arabe : Uthmani (quran-uthmani)
 * Translittération : en.transliteration
 *
 * Usage : node scripts/generate-hizb-data.mjs
 * Durée estimée : ~2-3 minutes (240 appels API avec délai)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../src/data/hizb');
const API_BASE = 'https://api.alquran.cloud/v1';
const DELAY_MS = 200; // délai entre appels pour respecter l'API

// ===== MAPPING SOURATES (114 sourates) =====
// Données factuelles : nom français, nom arabe, MQ=mecquoise / MD=médinoise, thème principal
const SURAHS = {
  1:  { fr: 'Al-Fatiha',    ar: 'الفاتحة',    type: 'MQ', theme: "L'ouverture — essence de la prière et du lien avec Allah" },
  2:  { fr: 'Al-Baqara',    ar: 'البقرة',     type: 'MD', theme: "Guidance, législation, récits des Fils d'Israël, loi islamique" },
  3:  { fr: 'Al-Imran',     ar: 'آل عمران',   type: 'MD', theme: "La famille d'Imran, Maryam, 'Isa, bataille d'Uhud, foi" },
  4:  { fr: 'An-Nisa',      ar: 'النساء',     type: 'MD', theme: "Droits des femmes, famille, successions, législation sociale" },
  5:  { fr: "Al-Ma'ida",    ar: 'المائدة',    type: 'MD', theme: "La table servie, alliances, halal/haram, Ahl al-Kitab" },
  6:  { fr: "Al-An'am",     ar: 'الأنعام',   type: 'MQ', theme: "Tawhid, argumentation contre le polythéisme, les interdits" },
  7:  { fr: "Al-A'raf",     ar: 'الأعراف',   type: 'MQ', theme: "Récits des prophètes, Adam, Nuh, Hud, Salih, Lut, Shu'ayb, Musa" },
  8:  { fr: 'Al-Anfal',     ar: 'الأنفال',   type: 'MD', theme: "Le butin, bataille de Badr, règles du jihad" },
  9:  { fr: 'At-Tawbah',    ar: 'التوبة',    type: 'MD', theme: "Le repentir, hypocrites, bataille de Tabuk, rupture des traités" },
  10: { fr: 'Yunus',        ar: 'يونس',       type: 'MQ', theme: "Jonas, foi et incrédulité, signes d'Allah dans la création" },
  11: { fr: 'Hud',          ar: 'هود',        type: 'MQ', theme: "Prophète Hud, Salih, Ibrahim, Lut, Shu'ayb, Musa — fermeté du Prophète" },
  12: { fr: 'Yusuf',        ar: 'يوسف',       type: 'MQ', theme: "Histoire complète de Joseph — la plus belle des histoires" },
  13: { fr: "Ar-Ra'd",      ar: 'الرعد',     type: 'MD', theme: "Le tonnerre, signes d'Allah, foi et incrédulité, du'a" },
  14: { fr: 'Ibrahim',      ar: 'إبراهيم',   type: 'MQ', theme: "Abraham, ingratitude et gratitude envers Allah, parabole de l'arbre" },
  15: { fr: 'Al-Hijr',      ar: 'الحجر',     type: 'MQ', theme: "Al-Hijr, création d'Adam, Iblis, récit de Lut" },
  16: { fr: 'An-Nahl',      ar: 'النحل',     type: 'MQ', theme: "Les abeilles, bienfaits d'Allah, tawhid, migration" },
  17: { fr: "Al-Isra'",     ar: 'الإسراء',   type: 'MQ', theme: "Le voyage nocturne, commandements moraux, le Coran comme guidance" },
  18: { fr: 'Al-Kahf',      ar: 'الكهف',     type: 'MQ', theme: "Les gens de la caverne, Musa et Khidr, Dhul Qarnayn, Dajjal" },
  19: { fr: 'Maryam',       ar: 'مريم',       type: 'MQ', theme: "Marie, naissance de 'Isa, Yahya, Ibrahim, prophètes" },
  20: { fr: 'Ta-Ha',        ar: 'طه',         type: 'MQ', theme: "Récit de Musa, mission prophétique, Adam et Iblis" },
  21: { fr: "Al-Anbiya'",   ar: 'الأنبياء',  type: 'MQ', theme: "Les prophètes : Ibrahim, Lut, Nuh, Dawud, Sulayman, Ayyub, Yunus, Zakariyya" },
  22: { fr: 'Al-Hajj',      ar: 'الحج',       type: 'MD', theme: "Le pèlerinage, Jour du Jugement, jihad, égorgement rituel" },
  23: { fr: "Al-Mu'minun",  ar: 'المؤمنون',  type: 'MQ', theme: "Caractéristiques des croyants, création humaine, récits de prophètes" },
  24: { fr: 'An-Nur',       ar: 'النور',      type: 'MD', theme: "La lumière, morale sexuelle, incident de l'Ifk, règles de bienséance" },
  25: { fr: 'Al-Furqan',    ar: 'الفرقان',   type: 'MQ', theme: "Le Discernement, arguments contre l'incrédulité, serviteurs du Miséricordieux" },
  26: { fr: "Ash-Shu'ara",  ar: 'الشعراء',   type: 'MQ', theme: "Les poètes, récits de Musa, Ibrahim, Nuh, Hud, Salih, Lut, Shu'ayb" },
  27: { fr: 'An-Naml',      ar: 'النمل',      type: 'MQ', theme: "Les fourmis, Sulayman, la reine de Saba, Salih, Lut" },
  28: { fr: 'Al-Qasas',     ar: 'القصص',     type: 'MQ', theme: "Le récit — naissance et mission de Musa, Qarun, hijra du Prophète" },
  29: { fr: "Al-'Ankabut",  ar: 'العنكبوت',  type: 'MQ', theme: "L'araignée, épreuve des croyants, récits de prophètes, fragile toile" },
  30: { fr: 'Ar-Rum',       ar: 'الروم',      type: 'MQ', theme: "Les Byzantins, signes d'Allah, résurrection, nature primordiale (fitra)" },
  31: { fr: 'Luqman',       ar: 'لقمان',      type: 'MQ', theme: "Sagesse de Luqman, ingratitude, bienfaits d'Allah" },
  32: { fr: 'As-Sajda',     ar: 'السجدة',    type: 'MQ', theme: "La prosternation, création, jugement, croyants et mécréants" },
  33: { fr: "Al-Ahzab",     ar: 'الأحزاب',   type: 'MD', theme: "Les coalisés, bataille du fossé, épouses du Prophète, vêtement islamique" },
  34: { fr: 'Saba',         ar: 'سبأ',        type: 'MQ', theme: "Le peuple de Saba, ingratitude, prophétie de Muhammad" },
  35: { fr: 'Fatir',        ar: 'فاطر',       type: 'MQ', theme: "Le Créateur, anges, tawhid, catégories humaines" },
  36: { fr: 'Ya-Sin',       ar: 'يس',         type: 'MQ', theme: "Coeur du Coran, mission prophétique, résurrection, signes d'Allah" },
  37: { fr: 'As-Saffat',    ar: 'الصافات',   type: 'MQ', theme: "Ceux en rangs, Ibrahim et Isma'il, Ilyas, Yunus, jour du jugement" },
  38: { fr: 'Sad',          ar: 'ص',          type: 'MQ', theme: "Dawud, Sulayman, Ayyub, prophètes, Iblis" },
  39: { fr: 'Az-Zumar',     ar: 'الزمر',     type: 'MQ', theme: "Les groupes, sincérité dans l'adoration, Paradis et Enfer" },
  40: { fr: 'Ghafir',       ar: 'غافر',       type: 'MQ', theme: "Le Pardonneur, croyant de Pharaon, tawhid, jugement" },
  41: { fr: 'Fussilat',     ar: 'فصلت',       type: 'MQ', theme: "Expliquées en détail, origines du Coran, 'Ad et Thamud, signes" },
  42: { fr: 'Ash-Shura',    ar: 'الشورى',    type: 'MQ', theme: "La consultation, révélation, unité des religions, attributs d'Allah" },
  43: { fr: 'Az-Zukhruf',   ar: 'الزخرف',   type: 'MQ', theme: "Les ornements, Ibrahim, Musa et Pharaon, 'Isa, jour du jugement" },
  44: { fr: 'Ad-Dukhan',    ar: 'الدخان',   type: 'MQ', theme: "La fumée, nuit bénie, châtiment des mécréants, Musa et Pharaon" },
  45: { fr: 'Al-Jathiya',   ar: 'الجاثية',   type: 'MQ', theme: "L'agenouillée, signes d'Allah, jugement, foi et incrédulité" },
  46: { fr: 'Al-Ahqaf',     ar: 'الأحقاف',   type: 'MQ', theme: "Les dunes, Hud et 'Ad, djinns écoutant le Coran, gratitude envers les parents" },
  47: { fr: 'Muhammad',     ar: 'محمد',       type: 'MD', theme: "Combat, règles du jihad, croyants et hypocrites" },
  48: { fr: 'Al-Fath',      ar: 'الفتح',     type: 'MD', theme: "La victoire, traité de Hudaybiyya, foi des compagnons" },
  49: { fr: 'Al-Hujurat',   ar: 'الحجرات',   type: 'MD', theme: "Les appartements, éthique islamique, fraternité, interdiction de la moquerie" },
  50: { fr: 'Qaf',          ar: 'ق',          type: 'MQ', theme: "Résurrection, mort, jour du jugement, création" },
  51: { fr: 'Adh-Dhariyat', ar: 'الذاريات',  type: 'MQ', theme: "Les vents, Ibrahim et les anges, Musa, 'Ad, Thamud, création pour l'adoration" },
  52: { fr: 'At-Tur',       ar: 'الطور',     type: 'MQ', theme: "Le Mont Sinaï, serments, châtiment, Paradis, mission prophétique" },
  53: { fr: 'An-Najm',      ar: 'النجم',     type: 'MQ', theme: "L'étoile, révélation à Muhammad, polythéisme, Jour du Jugement" },
  54: { fr: 'Al-Qamar',     ar: 'القمر',     type: 'MQ', theme: "La lune, peuples anciens punis, facilité du Coran" },
  55: { fr: 'Ar-Rahman',    ar: 'الرحمن',    type: 'MD', theme: "Le Tout Miséricordieux, bienfaits d'Allah, Paradis, refus de nier" },
  56: { fr: "Al-Waqi'a",    ar: 'الواقعة',   type: 'MQ', theme: "L'événement — trois catégories humaines au Jour du Jugement" },
  57: { fr: 'Al-Hadid',     ar: 'الحديد',    type: 'MD', theme: "Le fer, dépense dans la voie d'Allah, vie éphémère, lumière des croyants" },
  58: { fr: 'Al-Mujadala',  ar: 'المجادلة',  type: 'MD', theme: "La femme qui conteste, zihar, assemblées, hypocrites, alliance avec Allah" },
  59: { fr: 'Al-Hashr',     ar: 'الحشر',     type: 'MD', theme: "Le rassemblement, Banu Nadir, noms d'Allah, croyants et hypocrites" },
  60: { fr: 'Al-Mumtahana', ar: 'الممتحنة',  type: 'MD', theme: "La femme examinée, relations avec les non-musulmans, serment d'allégeance" },
  61: { fr: 'As-Saf',       ar: 'الصف',      type: 'MD', theme: "Les rangs, jihad pour Allah, 'Isa annonçant Ahmad" },
  62: { fr: "Al-Jumu'a",    ar: 'الجمعة',    type: 'MD', theme: "Le vendredi, prière du Jumu'a, mission du Prophète" },
  63: { fr: 'Al-Munafiqun', ar: 'المنافقون', type: 'MD', theme: "Les hypocrites, caractéristiques du nifaq" },
  64: { fr: 'At-Taghabun',  ar: 'التغابن',   type: 'MD', theme: "La mutuelle tromperie, Jour du Jugement, épreuves, dépense" },
  65: { fr: 'At-Talaq',     ar: 'الطلاق',    type: 'MD', theme: "Le divorce, règles juridiques, crainte d'Allah dans la famille" },
  66: { fr: 'At-Tahrim',    ar: 'التحريم',   type: 'MD', theme: "La prohibition, épouses du Prophète, exemples de femmes" },
  67: { fr: 'Al-Mulk',      ar: 'الملك',     type: 'MQ', theme: "La royauté d'Allah, création des cieux, mort et vie, signes de la nature" },
  68: { fr: 'Al-Qalam',     ar: 'القلم',     type: 'MQ', theme: "La plume, noblesse de caractère du Prophète, parabole du jardin" },
  69: { fr: "Al-Haqqa",     ar: 'الحاقة',   type: 'MQ', theme: "La réalité — 'Ad, Thamud, Pharaon, Jour du Jugement, le Coran parole d'Allah" },
  70: { fr: "Al-Ma'arij",   ar: 'المعارج',   type: 'MQ', theme: "Les degrés, Jour du Jugement, impatience humaine, Paradis" },
  71: { fr: 'Nuh',          ar: 'نوح',        type: 'MQ', theme: "Noé, da'wa prolongée, inondation, invocations de Nuh" },
  72: { fr: 'Al-Jinn',      ar: 'الجن',       type: 'MQ', theme: "Les djinns écoutant le Coran, tawhid, mission prophétique" },
  73: { fr: 'Al-Muzzammil', ar: 'المزمل',    type: 'MQ', theme: "L'enveloppé, prière de nuit, patience, Musa et Pharaon" },
  74: { fr: 'Al-Muddaththir',ar: 'المدثر',   type: 'MQ', theme: "Le revêtu, avertissement, Saqar, ingratitude de l'humain" },
  75: { fr: 'Al-Qiyama',    ar: 'القيامة',   type: 'MQ', theme: "La résurrection, serment sur le nafs, Jour du Jugement, mort" },
  76: { fr: 'Al-Insan',     ar: 'الإنسان',   type: 'MD', theme: "L'être humain, Paradis des pieux, patience, prière" },
  77: { fr: 'Al-Mursalat',  ar: 'المرسلات',  type: 'MQ', theme: "Les envoyés, Jour du Jugement, réfutation du déni" },
  78: { fr: "An-Naba'",     ar: 'النبأ',     type: 'MQ', theme: "La nouvelle, Jour du Jugement, signes de la création, Paradis et Enfer" },
  79: { fr: "An-Nazi'at",   ar: 'النازعات',  type: 'MQ', theme: "Ceux qui arrachent, Jour du Jugement, Musa et Pharaon, Heure" },
  80: { fr: 'Abasa',        ar: 'عبس',        type: 'MQ', theme: "Il s'est renfrogné, dignité des chercheurs de guidance, Jour du Jugement" },
  81: { fr: 'At-Takwir',    ar: 'التكوير',   type: 'MQ', theme: "L'enveloppement du soleil, Jour du Jugement, authenticité de la révélation" },
  82: { fr: 'Al-Infitar',   ar: 'الانفطار',  type: 'MQ', theme: "La déchirure des cieux, Jour du Jugement, anges gardiens" },
  83: { fr: 'Al-Mutaffifin',ar: 'المطففين',  type: 'MQ', theme: "Les fraudeurs, honnêteté dans la mesure, Jour du Jugement" },
  84: { fr: 'Al-Inshiqaq',  ar: 'الانشقاق',  type: 'MQ', theme: "Le déchirement, phases de la vie humaine, incrédulité de Mécque" },
  85: { fr: 'Al-Buruj',     ar: 'البروج',    type: 'MQ', theme: "Les constellations, gens de la tranchée, Allah l'Aimant, Coran préservé" },
  86: { fr: 'At-Tariq',     ar: 'الطارق',   type: 'MQ', theme: "L'astre nocturne, l'âme humaine, résurrection, délai pour les mécréants" },
  87: { fr: "Al-A'la",      ar: 'الأعلى',    type: 'MQ', theme: "Le Très-Haut, révélation, rappel, purification, succès du croyant" },
  88: { fr: 'Al-Ghashiya',  ar: 'الغاشية',  type: 'MQ', theme: "L'enveloppante, deux destins, signes d'Allah dans la nature, rappel" },
  89: { fr: 'Al-Fajr',      ar: 'الفجر',    type: 'MQ', theme: "L'aube, 'Ad, Thamud, Pharaon, l'âme apaisée, Paradis" },
  90: { fr: 'Al-Balad',     ar: 'البلد',    type: 'MQ', theme: "La cité sacrée, épreuves de l'humain, chemin escarpé, bonté" },
  91: { fr: 'Ash-Shams',    ar: 'الشمس',    type: 'MQ', theme: "Le soleil, purification de l'âme, Thamud, résistance à l'injustice" },
  92: { fr: 'Al-Layl',      ar: 'الليل',    type: 'MQ', theme: "La nuit, deux voies — générosité ou avarice, satisfaction d'Allah" },
  93: { fr: 'Ad-Duha',      ar: 'الضحى',    type: 'MQ', theme: "Le matin, bienfaits d'Allah sur le Prophète, gratitude" },
  94: { fr: 'Ash-Sharh',    ar: 'الشرح',    type: 'MQ', theme: "L'expansion de la poitrine, facilité après la difficulté" },
  95: { fr: 'At-Tin',       ar: 'التين',    type: 'MQ', theme: "Le figuier, création de l'humain dans la meilleure forme, Jugement" },
  96: { fr: "Al-'Alaq",     ar: 'العلق',    type: 'MQ', theme: "Le caillot, premières révélations, lecture au nom d'Allah" },
  97: { fr: "Al-Qadr",      ar: 'القدر',    type: 'MQ', theme: "La nuit du Destin, valeur de Laylat al-Qadr" },
  98: { fr: 'Al-Bayyina',   ar: 'البينة',   type: 'MD', theme: "La preuve claire, Ahl al-Kitab, vrais croyants, jugement" },
  99: { fr: 'Az-Zalzala',   ar: 'الزلزلة',  type: 'MD', theme: "Le séisme, témoignage de la terre, poids d'un atome de bien ou de mal" },
  100:{ fr: "Al-'Adiyat",   ar: 'العاديات', type: 'MQ', theme: "Les coursières, ingratitude humaine, résurrection" },
  101:{ fr: "Al-Qari'a",    ar: 'القارعة',  type: 'MQ', theme: "La fracassante, pesée des œuvres, deux destins" },
  102:{ fr: 'At-Takathur',  ar: 'التكاثر',  type: 'MQ', theme: "La course aux richesses, illusion du monde, interrogation sur les bienfaits" },
  103:{ fr: "Al-'Asr",      ar: 'العصر',    type: 'MQ', theme: "Le temps — l'humain en perte sauf les quatre qualités du vrai croyant" },
  104:{ fr: 'Al-Humaza',    ar: 'الهمزة',   type: 'MQ', theme: "Le calomniateur, amour de la richesse, Hutama" },
  105:{ fr: 'Al-Fil',       ar: 'الفيل',    type: 'MQ', theme: "L'éléphant, l'armée d'Abraha, protection divine de la Ka'ba" },
  106:{ fr: 'Quraysh',      ar: 'قريش',     type: 'MQ', theme: "Les Quraysh, bienfaits d'Allah, adoration du Seigneur de cette Maison" },
  107:{ fr: "Al-Ma'un",     ar: 'الماعون',  type: 'MQ', theme: "L'ustensile, négation du Jugement, hypocrisie dans la prière" },
  108:{ fr: 'Al-Kawthar',   ar: 'الكوثر',   type: 'MQ', theme: "L'abondance, prière et sacrifice, l'ennemi du Prophète est abtar" },
  109:{ fr: 'Al-Kafirun',   ar: 'الكافرون', type: 'MQ', theme: "Les mécréants, séparation entre foi et incrédulité, liberté de religion" },
  110:{ fr: 'An-Nasr',      ar: 'النصر',    type: 'MD', theme: "Le secours, victoire de l'islam, tasbih et istighfar" },
  111:{ fr: 'Al-Masad',     ar: 'المسد',    type: 'MQ', theme: "Les fibres — Abu Lahab et sa femme, opposition à l'islam" },
  112:{ fr: 'Al-Ikhlas',    ar: 'الإخلاص',  type: 'MQ', theme: "La pureté — Allah Un, l'Impénétrable, sans enfant ni égal" },
  113:{ fr: 'Al-Falaq',     ar: 'الفلق',    type: 'MQ', theme: "L'aube naissante — protection contre le mal de la création" },
  114:{ fr: 'An-Nas',       ar: 'الناس',    type: 'MQ', theme: "Les hommes — protection contre le souffleur mauvais" },
};

// ===== UTILITAIRES =====

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function padNum(n) {
  return String(n).padStart(2, '0');
}

function escapeStr(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// ===== FETCH D'UNE ÉDITION UNIQUE =====
async function fetchEdition(quarterNum, edition) {
  const url = `${API_BASE}/hizbQuarter/${quarterNum}/${edition}`;
  const data = await fetchJSON(url);
  return data.data.ayahs;
}

// ===== FETCH D'UN HIZB QUARTER (3 appels séparés) =====
async function fetchHizbQuarter(quarterNum) {
  const arabicAyahs = await fetchEdition(quarterNum, 'quran-uthmani');
  await delay(DELAY_MS);
  const frenchAyahs = await fetchEdition(quarterNum, 'fr.hamidullah');
  await delay(DELAY_MS);
  const transAyahs = await fetchEdition(quarterNum, 'en.transliteration');
  await delay(DELAY_MS);

  return arabicAyahs.map((ayah, idx) => ({
    surahNumber: ayah.surah.number,
    surahName: SURAHS[ayah.surah.number]?.fr ?? ayah.surah.englishName,
    surahNameArabic: ayah.surah.name,
    verseNumber: ayah.numberInSurah,
    key: `${ayah.surah.number}:${ayah.numberInSurah}`,
    textArabic: ayah.text,
    textFrench: frenchAyahs[idx]?.text ?? '',
    transliteration: transAyahs[idx]?.text ?? '',
  }));
}

// ===== GÉNÈRE LE CONTEXTE MINIMAL (factuel) POUR UN HIZB =====
function buildMinimalContext(hizbNumber, verses) {
  // Déterminer les sourates uniques couvertes
  const surahNums = [...new Set(verses.map((v) => v.surahNumber))];
  const surahNames = surahNums
    .map((n) => SURAHS[n] ? `${SURAHS[n].fr} (${SURAHS[n].ar})` : `Sourate ${n}`)
    .join(', ');

  const firstVerse = verses[0];
  const lastVerse = verses[verses.length - 1];
  const rangeStr = firstVerse.surahNumber === lastVerse.surahNumber
    ? `${firstVerse.surahName}, versets ${firstVerse.verseNumber} à ${lastVerse.verseNumber}`
    : `${firstVerse.surahName} v.${firstVerse.verseNumber} — ${lastVerse.surahName} v.${lastVerse.verseNumber}`;

  const surahTypes = surahNums.map((n) => {
    const s = SURAHS[n];
    return s ? `${s.fr} : ${s.type === 'MQ' ? 'mecquoise' : 'médinoise'} — ${s.theme}` : null;
  }).filter(Boolean);

  return {
    title: `Hizb ${hizbNumber} — ${surahNames}`,
    surahsCovered: surahNums.map((n) => {
      const s = SURAHS[n];
      if (!s) return `Sourate ${n}`;
      const firstV = verses.find((v) => v.surahNumber === n);
      const lastV = [...verses].reverse().find((v) => v.surahNumber === n);
      if (firstV && lastV && firstV.verseNumber !== lastV.verseNumber) {
        return `${s.fr} (${firstV.verseNumber}-${lastV.verseNumber})`;
      }
      return firstV ? `${s.fr} (v.${firstV.verseNumber})` : s.fr;
    }),
    context: `Ce hizb couvre ${rangeStr}. ${surahTypes.join(' — ')}.`,
    linkWithPrevious: hizbNumber === 1
      ? "Ce hizb est l'ouverture du Coran. Il n'y a pas de hizb précédent."
      : `Ce hizb (n°${hizbNumber}) fait suite au hizb ${hizbNumber - 1}. Il s'inscrit dans la progression thématique du Coran.`,
    passageAnalysis: surahNums.map((n) => {
      const s = SURAHS[n];
      const svs = verses.filter((v) => v.surahNumber === n);
      const range = svs.length > 1
        ? `versets ${svs[0].verseNumber} à ${svs[svs.length - 1].verseNumber}`
        : `verset ${svs[0]?.verseNumber ?? '?'}`;
      return {
        title: `${s?.fr ?? `Sourate ${n}`} — ${range}`,
        content: s
          ? `${s.fr} est une sourate ${s.type === 'MQ' ? 'mecquoise' : 'médinoise'}. Thème principal : ${s.theme}. Commentaire détaillé à venir, insha'Allah.`
          : `Commentaire à venir.`,
      };
    }),
  };
}

// ===== GÉNÈRE LE CODE TYPESCRIPT D'UN FICHIER HIZB =====
function generateHizbFile(hizbNumber, verses, meta) {
  const versesCode = verses.map((v) => `    {
      surahNumber: ${v.surahNumber},
      surahName: '${escapeStr(v.surahName)}',
      surahNameArabic: '${escapeStr(v.surahNameArabic)}',
      verseNumber: ${v.verseNumber},
      key: '${v.key}',
      textArabic: \`${escapeStr(v.textArabic)}\`,
      textFrench: \`${escapeStr(v.textFrench)}\`,
      transliteration: \`${escapeStr(v.transliteration)}\`,
    }`).join(',\n');

  const passageCode = meta.passageAnalysis.map((p) => `    {
      title: \`${escapeStr(p.title)}\`,
      content: \`${escapeStr(p.content)}\`,
    }`).join(',\n');

  const surahsCoveredCode = meta.surahsCovered.map((s) => `'${escapeStr(s)}'`).join(', ');

  return `import type { Hizb } from '../types';

/**
 * HIZB ${hizbNumber}
 * Source : AlQuran Cloud API (alquran.cloud)
 * Traduction : Muhammad Hamidullah (fr.hamidullah)
 * Texte arabe : Uthmani (quran-uthmani)
 * Translittération : en.transliteration
 *
 * NOTE : Ce hizb contient les textes du Coran.
 * Le commentaire (contexte approfondi, tafsir, synthèse) sera ajouté
 * progressivement avec rigueur et sourçage. Insha'Allah.
 */

export const hizb${padNum(hizbNumber)}: Hizb = {
  number: ${hizbNumber},
  title: \`${escapeStr(meta.title)}\`,
  surahsCovered: [${surahsCoveredCode}],
  context: \`${escapeStr(meta.context)}\`,
  linkWithPrevious: \`${escapeStr(meta.linkWithPrevious)}\`,
  passageAnalysis: [
${passageCode}
  ],
  verses: [
${versesCode}
  ],
  // synthesis: non disponible — sera enrichi progressivement, insha'Allah.
};
`;
}

// ===== MAIN =====
async function main() {
  console.log('🕌 Démarrage de la génération des données du Coran...');
  console.log(`📡 Source : AlQuran Cloud API`);
  console.log(`📂 Sortie : ${OUTPUT_DIR}`);
  console.log('');

  // Tester la connexion API
  try {
    await fetchJSON(`${API_BASE}/meta`);
    console.log('✅ Connexion API AlQuran Cloud OK\n');
  } catch (e) {
    console.error('❌ Impossible de joindre l\'API AlQuran Cloud:', e.message);
    process.exit(1);
  }

  const errors = [];
  const successFiles = [];

  for (let hizbNum = 2; hizbNum <= 60; hizbNum++) {
    const filename = `hizb-${padNum(hizbNum)}.ts`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    // Sauter si déjà généré (permet la reprise en cas d'interruption)
    if (fs.existsSync(outputPath)) {
      console.log(`⏭  Hizb ${hizbNum} — déjà existant, saut.`);
      successFiles.push(hizbNum);
      continue;
    }

    process.stdout.write(`⏳ Hizb ${hizbNum}/60 — Récupération des 4 quarts...`);

    try {
      const allVerses = [];

      for (let q = 1; q <= 4; q++) {
        const quarterNum = (hizbNum - 1) * 4 + q;
        const verses = await fetchHizbQuarter(quarterNum);
        allVerses.push(...verses);
      }

      const meta = buildMinimalContext(hizbNum, allVerses);
      const fileContent = generateHizbFile(hizbNum, allVerses, meta);

      fs.writeFileSync(outputPath, fileContent, 'utf-8');
      console.log(` ✅ ${allVerses.length} versets — ${filename}`);
      successFiles.push(hizbNum);

    } catch (err) {
      console.log(` ❌ ERREUR: ${err.message}`);
      errors.push({ hizbNum, error: err.message });
    }
  }

  console.log('\n============================================');
  console.log(`✅ Hizbs générés : ${successFiles.length}/59`);
  if (errors.length > 0) {
    console.log(`❌ Erreurs : ${errors.length}`);
    errors.forEach((e) => console.log(`   - Hizb ${e.hizbNum}: ${e.error}`));
    console.log('\nRelancez le script pour réessayer les hizbs en erreur.');
  }
  console.log('============================================\n');

  if (errors.length === 0) {
    console.log('🎉 Génération complète ! Prochaine étape :');
    console.log('   node scripts/generate-hizb-index.mjs');
    console.log('   (ou mettre à jour manuellement src/data/hizb/index.ts)');
  }
}

main().catch(console.error);

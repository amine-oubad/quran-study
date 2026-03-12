# Quran Study

Application web d'etude structuree du Coran, organisee par **hizb** (division traditionnelle en 60 parties).

Chaque hizb propose : texte arabe (police UthmanicHafs), traduction francaise (Hamidullah), translitteration phonetique, et exegese sourcee progressive (Ibn Kathir, At-Tabari, Al-Qurtubi, As-Sa'di).

## Fonctionnalites

- 60 hizbs navigables avec texte arabe, traduction et phonetique
- Toggle d'affichage : Francais / Arabe / Phonetique
- Exegese sourcee (tafsir) sur les versets enrichis
- Synthese de fin de hizb (theologique, juridique, spirituelle)
- Recherche par sourate, hizb ou verset
- Progression de lecture (reprise automatique)
- Marque-pages de versets
- Bloc-notes persistant
- Sidebar responsive (60 hizbs)
- Virtualisation des listes de versets (performances)
- Code splitting (lazy loading par hizb)

## Stack technique

| Technologie | Version | Role |
|---|---|---|
| React | 19.2 | UI |
| TypeScript | 5.9 | Typage |
| Vite | 7.3 | Build + dev server |
| Tailwind CSS | 4.2 | Styling |
| Zustand | 5 | State management (persist localStorage) |
| React Router | 7 | Routing SPA |
| React Virtuoso | 4 | Virtualisation des listes |
| Lucide React | 0.577 | Icones |
| Vitest | 4 | Tests unitaires |

## Lancer le projet

```bash
# Installation
npm install

# Developpement (port 5173)
npm run dev

# Build production
npm run build

# Tests
npm run test:run

# Lint
npm run lint
```

## Structure du projet

```
src/
├── components/
│   ├── layout/          # Layout, Header, Sidebar, SearchBar
│   ├── quran/           # HizbHeader, VerseCard, VerseCommentary, DisplayModeToggle, HizbSynthesis
│   └── notepad/         # Notepad
├── pages/               # HomePage, HizbPage, NotFoundPage
├── data/
│   ├── types.ts         # Interfaces TypeScript (Hizb, Verse, Commentary...)
│   └── hizb/            # index.ts + 60 fichiers hizb-XX.ts (lazy loaded)
├── stores/              # useReadingStore, useNotepadStore (Zustand)
├── lib/utils.ts         # Utilitaires (cn, formatters)
└── test/setup.ts        # Configuration Vitest
```

## Donnees

Les textes coraniques proviennent de l'API [AlQuran Cloud](https://alquran.cloud) :
- **Arabe** : Edition quran-uthmani
- **Traduction** : Muhammad Hamidullah (fr.hamidullah)
- **Translitteration** : en.transliteration

Le script de generation est dans `scripts/generate-hizb-data.mjs`.

## Etat du contenu

| Contenu | Couverture |
|---|---|
| Texte arabe + traduction + phonetique | 60/60 hizbs |
| Exegese sourcee (tafsir par verset) | Hizb 1 (12 premiers versets) |
| Synthese de fin de hizb | Hizb 1 |
| Analyse des passages | Tous les hizbs (auto-generee) |

L'exegese est enrichie progressivement avec rigueur et verification.

## Licence

Projet prive.

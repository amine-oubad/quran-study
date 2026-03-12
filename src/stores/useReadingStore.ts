import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DisplayMode } from '@/data/types';

interface ReadingState {
  /** Hizb actuellement consulté */
  currentHizb: number;
  /** Mode d'affichage du texte */
  displayMode: DisplayMode;
  /** Versets favoris / marqués */
  bookmarks: string[];
  /** Notes contextuelles par verset (clé → texte) */
  verseNotes: Record<string, string>;
  /** Sidebar ouverte ? */
  sidebarOpen: boolean;
  /** Dernier verset lu (clé) */
  lastReadVerse: string | null;
  /** Dernier hizb lu */
  lastReadHizb: number | null;

  setCurrentHizb: (hizb: number) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  toggleBookmark: (verseKey: string) => void;
  isBookmarked: (verseKey: string) => boolean;
  setVerseNote: (verseKey: string, note: string) => void;
  deleteVerseNote: (verseKey: string) => void;
  getVerseNote: (verseKey: string) => string | undefined;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLastRead: (hizbNumber: number, verseKey: string) => void;
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      currentHizb: 1,
      displayMode: 'french',
      bookmarks: [],
      verseNotes: {},
      sidebarOpen: false,
      lastReadVerse: null,
      lastReadHizb: null,

      setCurrentHizb: (hizb) => set({ currentHizb: hizb }),

      setDisplayMode: (mode) => set({ displayMode: mode }),

      toggleBookmark: (verseKey) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(verseKey)
            ? state.bookmarks.filter((k) => k !== verseKey)
            : [...state.bookmarks, verseKey],
        })),

      isBookmarked: (verseKey) => get().bookmarks.includes(verseKey),

      setVerseNote: (verseKey, note) =>
        set((state) => ({
          verseNotes: { ...state.verseNotes, [verseKey]: note },
        })),

      deleteVerseNote: (verseKey) =>
        set((state) => {
          const { [verseKey]: _, ...rest } = state.verseNotes;
          return { verseNotes: rest };
        }),

      getVerseNote: (verseKey) => get().verseNotes[verseKey],

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      setLastRead: (hizbNumber, verseKey) =>
        set({ lastReadHizb: hizbNumber, lastReadVerse: verseKey }),
    }),
    {
      name: 'quran-study-reading',
    }
  )
);

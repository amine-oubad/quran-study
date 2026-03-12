import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserNote } from '@/data/types';

interface NotepadState {
  notes: UserNote[];
  isOpen: boolean;
  currentDraft: string;

  toggleNotepad: () => void;
  setOpen: (open: boolean) => void;
  setDraft: (text: string) => void;
  addNote: (note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotepadStore = create<NotepadState>()(
  persist(
    (set) => ({
      notes: [],
      isOpen: false,
      currentDraft: '',

      toggleNotepad: () => set((s) => ({ isOpen: !s.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      setDraft: (text) => set({ currentDraft: text }),

      addNote: (note) =>
        set((s) => ({
          notes: [
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...s.notes,
          ],
          currentDraft: '',
        })),

      updateNote: (id, content) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id
              ? { ...n, content, updatedAt: new Date().toISOString() }
              : n
          ),
        })),

      deleteNote: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
    }),
    {
      name: 'quran-study-notepad',
    }
  )
);

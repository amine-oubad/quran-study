import { describe, it, expect, beforeEach } from 'vitest';
import { useReadingStore } from './useReadingStore';

describe('useReadingStore', () => {
  beforeEach(() => {
    // Reset store between tests
    useReadingStore.setState({
      currentHizb: 1,
      displayMode: 'french',
      bookmarks: [],
      verseNotes: {},
      sidebarOpen: false,
      lastReadVerse: null,
      lastReadHizb: null,
    });
  });

  it('has correct default values', () => {
    const state = useReadingStore.getState();
    expect(state.currentHizb).toBe(1);
    expect(state.displayMode).toBe('french');
    expect(state.bookmarks).toEqual([]);
    expect(state.verseNotes).toEqual({});
    expect(state.sidebarOpen).toBe(false);
    expect(state.lastReadVerse).toBeNull();
    expect(state.lastReadHizb).toBeNull();
  });

  it('sets current hizb', () => {
    useReadingStore.getState().setCurrentHizb(30);
    expect(useReadingStore.getState().currentHizb).toBe(30);
  });

  it('sets display mode', () => {
    useReadingStore.getState().setDisplayMode('arabic');
    expect(useReadingStore.getState().displayMode).toBe('arabic');
  });

  it('toggles bookmark on and off', () => {
    const { toggleBookmark, isBookmarked } = useReadingStore.getState();

    toggleBookmark('2:255');
    expect(useReadingStore.getState().bookmarks).toContain('2:255');
    expect(isBookmarked('2:255')).toBe(true);

    useReadingStore.getState().toggleBookmark('2:255');
    expect(useReadingStore.getState().bookmarks).not.toContain('2:255');
  });

  it('toggles sidebar', () => {
    useReadingStore.getState().toggleSidebar();
    expect(useReadingStore.getState().sidebarOpen).toBe(true);

    useReadingStore.getState().toggleSidebar();
    expect(useReadingStore.getState().sidebarOpen).toBe(false);
  });

  it('sets last read position', () => {
    useReadingStore.getState().setLastRead(5, '2:74');
    const state = useReadingStore.getState();
    expect(state.lastReadHizb).toBe(5);
    expect(state.lastReadVerse).toBe('2:74');
  });

  it('sets and retrieves a verse note', () => {
    useReadingStore.getState().setVerseNote('2:255', 'Ayat al-Kursi — le plus grand verset');
    expect(useReadingStore.getState().verseNotes['2:255']).toBe('Ayat al-Kursi — le plus grand verset');
    expect(useReadingStore.getState().getVerseNote('2:255')).toBe('Ayat al-Kursi — le plus grand verset');
  });

  it('overwrites an existing verse note', () => {
    useReadingStore.getState().setVerseNote('1:1', 'Première note');
    useReadingStore.getState().setVerseNote('1:1', 'Note corrigée');
    expect(useReadingStore.getState().verseNotes['1:1']).toBe('Note corrigée');
  });

  it('deletes a verse note', () => {
    useReadingStore.getState().setVerseNote('2:255', 'À relire');
    useReadingStore.getState().deleteVerseNote('2:255');
    expect(useReadingStore.getState().verseNotes['2:255']).toBeUndefined();
    expect(useReadingStore.getState().getVerseNote('2:255')).toBeUndefined();
  });

  it('returns undefined for non-existent verse note', () => {
    expect(useReadingStore.getState().getVerseNote('99:1')).toBeUndefined();
  });
});

import { describe, it, expect } from 'vitest';
import { hizbList, getHizbData } from './index';

describe('hizbList', () => {
  it('contains 60 hizbs', () => {
    expect(hizbList).toHaveLength(60);
  });

  it('all hizbs are available', () => {
    const unavailable = hizbList.filter((h) => !h.available);
    expect(unavailable).toHaveLength(0);
  });

  it('hizbs are numbered 1 through 60', () => {
    const numbers = hizbList.map((h) => h.number);
    expect(numbers[0]).toBe(1);
    expect(numbers[59]).toBe(60);
    expect(new Set(numbers).size).toBe(60);
  });

  it('each hizb has surahsCovered', () => {
    for (const hizb of hizbList) {
      expect(hizb.surahsCovered).toBeTruthy();
      expect(hizb.surahsCovered.length).toBeGreaterThan(0);
    }
  });
});

describe('getHizbData', () => {
  it('loads hizb 1 with 81 verses', async () => {
    const hizb = await getHizbData(1);
    expect(hizb).toBeDefined();
    expect(hizb!.number).toBe(1);
    expect(hizb!.verses).toHaveLength(81);
  });

  it('returns undefined for invalid hizb number', async () => {
    const hizb = await getHizbData(0);
    expect(hizb).toBeUndefined();
  });

  it('returns undefined for hizb 61', async () => {
    const hizb = await getHizbData(61);
    expect(hizb).toBeUndefined();
  });

  it('hizb 1 has commentary on first verse', async () => {
    const hizb = await getHizbData(1);
    expect(hizb!.verses[0].commentary).toBeDefined();
    expect(hizb!.verses[0].commentary!.tafsirReferences.length).toBeGreaterThan(0);
  });

  it('hizb 1 has synthesis', async () => {
    const hizb = await getHizbData(1);
    expect(hizb!.synthesis).toBeDefined();
    expect(hizb!.synthesis!.theological).toBeTruthy();
    expect(hizb!.synthesis!.actions.length).toBeGreaterThan(0);
  });

  it('every verse has required fields', async () => {
    const hizb = await getHizbData(1);
    for (const verse of hizb!.verses) {
      expect(verse.surahNumber).toBeGreaterThan(0);
      expect(verse.surahName).toBeTruthy();
      expect(verse.verseNumber).toBeGreaterThan(0);
      expect(verse.key).toMatch(/^\d+:\d+$/);
      expect(verse.textArabic).toBeTruthy();
      expect(verse.textFrench).toBeTruthy();
      expect(verse.transliteration).toBeTruthy();
    }
  });

  it('caches loaded data (second call is instant)', async () => {
    await getHizbData(2); // first load
    const start = performance.now();
    const hizb = await getHizbData(2); // cached
    const elapsed = performance.now() - start;
    expect(hizb).toBeDefined();
    expect(elapsed).toBeLessThan(5); // should be near-instant from cache
  });
});

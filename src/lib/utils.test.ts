import { describe, it, expect } from 'vitest';
import { cn, formatHizbNumber, formatVerseKey } from './utils';

describe('cn', () => {
  it('combines class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('filters falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('returns empty string when no classes', () => {
    expect(cn(false, null)).toBe('');
  });
});

describe('formatHizbNumber', () => {
  it('formats hizb 1', () => {
    expect(formatHizbNumber(1)).toBe('Hizb 1');
  });

  it('formats hizb 60', () => {
    expect(formatHizbNumber(60)).toBe('Hizb 60');
  });
});

describe('formatVerseKey', () => {
  it('formats a verse key', () => {
    expect(formatVerseKey('2:255')).toBe('Sourate 2, verset 255');
  });

  it('formats Al-Fatiha verse 1', () => {
    expect(formatVerseKey('1:1')).toBe('Sourate 1, verset 1');
  });
});

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { hizbList } from '@/data/hizb';
import { cn } from '@/lib/utils';

interface SearchResult {
  type: 'hizb';
  hizbNumber: number;
  label: string;
  detail: string;
}

function searchHizbs(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Search by hizb number
  const numMatch = q.match(/^(\d+)$/);
  if (numMatch) {
    const num = parseInt(numMatch[1]);
    const hizb = hizbList.find((h) => h.number === num && h.available);
    if (hizb) {
      results.push({
        type: 'hizb',
        hizbNumber: hizb.number,
        label: `Hizb ${hizb.number}`,
        detail: hizb.surahsCovered,
      });
    }
  }

  // Search by verse key (e.g. "2:255")
  const verseMatch = q.match(/^(\d+):(\d+)$/);
  if (verseMatch) {
    const surahNum = parseInt(verseMatch[1]);
    // Find which hizb contains this surah
    for (const hizb of hizbList) {
      if (!hizb.available) continue;
      const covered = hizb.surahsCovered.toLowerCase();
      // Simple heuristic: check if surah number could be in range
      if (covered.includes(`(${surahNum}`) || covered.includes(`(${surahNum}-`) || covered.includes(`-${surahNum})`)) {
        results.push({
          type: 'hizb',
          hizbNumber: hizb.number,
          label: `Verset ${q}`,
          detail: `Hizb ${hizb.number} — ${hizb.surahsCovered}`,
        });
      }
    }
  }

  // Search by surah name
  for (const hizb of hizbList) {
    if (!hizb.available) continue;
    const covered = hizb.surahsCovered.toLowerCase();
    if (covered.includes(q)) {
      const alreadyAdded = results.some((r) => r.hizbNumber === hizb.number);
      if (!alreadyAdded) {
        results.push({
          type: 'hizb',
          hizbNumber: hizb.number,
          label: `Hizb ${hizb.number}`,
          detail: hizb.surahsCovered,
        });
      }
    }
  }

  return results.slice(0, 8);
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setResults(searchHizbs(query));
    setSelectedIdx(0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function goTo(result: SearchResult) {
    navigate(`/hizb/${result.hizbNumber}`);
    setQuery('');
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      goTo(results[selectedIdx]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-white px-3 py-1.5 text-sm shadow-sm transition-colors focus-within:border-primary">
        <Search size={16} className="shrink-0 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Sourate, hizb, verset…"
          className="w-32 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:w-44"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-xl border border-border-soft bg-white shadow-lg sm:w-80">
          {results.length > 0 ? (
            results.map((result, idx) => (
              <button
                key={`${result.hizbNumber}-${idx}`}
                onClick={() => goTo(result)}
                className={cn(
                  'flex w-full flex-col px-4 py-2.5 text-left transition-colors',
                  idx === selectedIdx ? 'bg-warm' : 'hover:bg-warm/50'
                )}
              >
                <span className="text-sm font-medium text-gray-800">
                  {result.label}
                </span>
                <span className="text-xs text-gray-400">{result.detail}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-xs text-gray-400">
              Aucun résultat pour « {query} »
            </div>
          )}
        </div>
      )}
    </div>
  );
}

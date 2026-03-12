import { Languages, BookOpenText, Mic } from 'lucide-react';
import { useReadingStore } from '@/stores/useReadingStore';
import type { DisplayMode } from '@/data/types';
import { cn } from '@/lib/utils';

const modes: { key: DisplayMode; label: string; icon: typeof Languages }[] = [
  { key: 'french', label: 'Français', icon: BookOpenText },
  { key: 'arabic', label: 'Arabe', icon: Languages },
  { key: 'transliteration', label: 'Phonétique', icon: Mic },
];

export default function DisplayModeToggle() {
  const { displayMode, setDisplayMode } = useReadingStore();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border-soft bg-white p-1 shadow-sm">
      {modes.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setDisplayMode(key)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm',
            displayMode === key
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-500 hover:bg-warm hover:text-gray-700'
          )}
        >
          <Icon size={15} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

import { BookOpen, Menu, StickyNote } from 'lucide-react';
import { Link } from 'react-router';
import { useReadingStore } from '@/stores/useReadingStore';
import { useNotepadStore } from '@/stores/useNotepadStore';
import SearchBar from './SearchBar';

export default function Header() {
  const toggleSidebar = useReadingStore((s) => s.toggleSidebar);
  const toggleNotepad = useNotepadStore((s) => s.toggleNotepad);

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-warm hover:text-primary lg:hidden"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2.5 text-primary no-underline">
            <BookOpen size={26} strokeWidth={1.8} />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold tracking-tight">Quran Study</span>
              <span className="hidden text-xs text-gray-500 sm:block">
                Étude structurée par hizb
              </span>
            </div>
          </Link>
        </div>

        {/* Center: search */}
        <SearchBar />

        {/* Right: notepad button */}
        <button
          onClick={toggleNotepad}
          className="flex items-center gap-2 rounded-lg border border-border-soft bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary hover:text-primary"
          aria-label="Bloc-notes"
        >
          <StickyNote size={18} />
          <span className="hidden sm:inline">Bloc-notes</span>
        </button>
      </div>
    </header>
  );
}

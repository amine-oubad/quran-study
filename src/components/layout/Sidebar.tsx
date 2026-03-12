import { X, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useReadingStore } from '@/stores/useReadingStore';
import { hizbList } from '@/data/hizb';
import { cn, formatHizbNumber } from '@/lib/utils';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, lastReadHizb } = useReadingStore();
  const params = useParams();
  const currentHizbNum = params.hizbId ? parseInt(params.hizbId) : null;

  return (
    <>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r border-border-soft bg-white transition-transform duration-300 lg:sticky lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header sidebar */}
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Ahzab (أحزاب)
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Liste des hizb */}
        <nav className="h-full overflow-y-auto p-2">
          {hizbList.map((hizb) => {
            const isActive = currentHizbNum === hizb.number;
            const isLastRead = !isActive && lastReadHizb === hizb.number;
            const isAvailable = hizb.available;

            return (
              <Link
                key={hizb.number}
                to={isAvailable ? `/hizb/${hizb.number}` : '#'}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'mb-0.5 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm no-underline transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : isLastRead
                      ? 'border border-primary/20 bg-primary/5 text-primary'
                      : isAvailable
                        ? 'text-gray-700 hover:bg-warm'
                        : 'cursor-not-allowed text-gray-300'
                )}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{formatHizbNumber(hizb.number)}</span>
                  <span
                    className={cn(
                      'text-xs',
                      isActive ? 'text-white/80' : 'text-gray-400'
                    )}
                  >
                    {hizb.surahsCovered}
                  </span>
                </div>
                {isAvailable && (
                  <ChevronRight size={16} className={isActive ? 'text-white/70' : 'text-gray-300'} />
                )}
              </Link>
            );
          })}

          {/* Info exégèse */}
          <div className="mt-4 rounded-lg border border-dashed border-border-soft p-3 text-center text-xs text-gray-400">
            Exégèse sourçée en cours d'ajout progressif, insha'Allah.
          </div>
        </nav>
      </aside>
    </>
  );
}

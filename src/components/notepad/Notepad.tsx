import { X, Plus, Trash2, StickyNote } from 'lucide-react';
import { useNotepadStore } from '@/stores/useNotepadStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Notepad() {
  const { isOpen, setOpen, notes, currentDraft, setDraft, addNote, deleteNote } =
    useNotepadStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddNote = () => {
    if (!currentDraft.trim()) return;
    addNote({ content: currentDraft.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddNote();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/20"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div className="animate-slide-in fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-border-soft bg-white shadow-2xl sm:w-96">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-soft bg-warm px-4 py-3">
          <div className="flex items-center gap-2">
            <StickyNote size={20} className="text-primary" />
            <h2 className="text-base font-semibold text-gray-800">Bloc-notes</h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {notes.length}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Zone de saisie */}
        <div className="border-b border-border-soft p-4">
          <textarea
            value={currentDraft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écrire une note... (Ctrl+Entrée pour ajouter)"
            className="w-full resize-none rounded-lg border border-border-soft bg-parchment p-3 text-sm placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            rows={3}
          />
          <button
            onClick={handleAddNote}
            disabled={!currentDraft.trim()}
            className={cn(
              'mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors',
              currentDraft.trim()
                ? 'bg-primary text-white hover:bg-primary-light'
                : 'cursor-not-allowed bg-gray-100 text-gray-400'
            )}
          >
            <Plus size={16} />
            Ajouter la note
          </button>
        </div>

        {/* Liste des notes */}
        <div className="flex-1 overflow-y-auto p-4">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <StickyNote size={40} strokeWidth={1} className="mb-3 text-gray-300" />
              <p className="text-sm">Aucune note pour l'instant.</p>
              <p className="mt-1 text-xs">
                Prenez des notes pendant votre étude.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="group rounded-lg border border-border-soft bg-parchment p-3 transition-colors hover:border-primary/20"
                >
                  {editingId === note.id ? (
                    <textarea
                      defaultValue={note.content}
                      onBlur={(e) => {
                        useNotepadStore.getState().updateNote(note.id, e.target.value);
                        setEditingId(null);
                      }}
                      autoFocus
                      className="w-full resize-none rounded border border-primary/30 bg-white p-2 text-sm outline-none"
                      rows={3}
                    />
                  ) : (
                    <p
                      className="cursor-pointer whitespace-pre-wrap text-sm leading-relaxed text-gray-700"
                      onClick={() => setEditingId(note.id)}
                    >
                      {note.content}
                    </p>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(note.updatedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="rounded p-1 text-gray-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => { document.title = 'Page introuvable — Quran Study'; }, []);
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="mb-4 text-6xl">🔍</p>
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Page introuvable</h1>
      <p className="mb-6 text-sm text-gray-500">
        Cette page n'existe pas ou n'est pas encore disponible.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white no-underline hover:bg-primary-light"
      >
        <ArrowLeft size={16} />
        Retour à l'accueil
      </Link>
    </div>
  );
}

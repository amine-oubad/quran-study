import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import Notepad from '@/components/notepad/Notepad';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex">
        <Sidebar />

        {/* Contenu principal */}
        <main className="min-h-[calc(100vh-4rem)] flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bloc-notes flottant */}
      <Notepad />
    </div>
  );
}

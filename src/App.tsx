import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import HizbPage from '@/pages/HizbPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hizb/:hizbId" element={<HizbPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

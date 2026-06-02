import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SiteLayout() {
  return (
    <div className='min-h-dvh flex flex-col bg-slate-50 text-slate-900'>
      <Header />
      <main className='container mx-auto w-full max-w-6xl flex-1 px-4 py-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

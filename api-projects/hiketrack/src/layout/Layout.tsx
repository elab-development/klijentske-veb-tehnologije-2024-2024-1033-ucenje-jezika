import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <div className='min-h-dvh flex flex-col bg-stone-100 text-stone-800'>
      <Navbar />

      <main className='flex-1'>
        <div className='mx-auto max-w-6xl px-4 py-8'>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

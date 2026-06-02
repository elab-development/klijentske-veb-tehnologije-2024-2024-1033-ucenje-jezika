import { Outlet } from 'react-router-dom';

import { EventsProvider } from './context/EventsContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <EventsProvider>
      <div className='min-h-screen flex flex-col bg-gray-50 text-gray-900'>
        <Navbar />
        <main className='flex-1 mx-auto max-w-6xl px-4 py-8'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </EventsProvider>
  );
}

export default App;

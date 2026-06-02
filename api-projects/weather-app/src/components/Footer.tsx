import { Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-white shadow-inner'>
      <div className='container mx-auto px-4 py-6 text-center text-sm text-slate-600'>
        <p className='flex items-center justify-center gap-2'>
          <Cloud size={18} className='text-orange-600' />
          <span className='text-orange-600 font-semibold'>
            &copy; {new Date().getFullYear()} WeatherApp
          </span>
        </p>
        <p className='mt-1'>
          Data powered by{' '}
          <a
            href='https://openweathermap.org/'
            target='_blank'
            rel='noreferrer'
            className='text-orange-600 font-medium hover:underline'
          >
            OpenWeatherMap
          </a>
        </p>
      </div>
    </footer>
  );
}

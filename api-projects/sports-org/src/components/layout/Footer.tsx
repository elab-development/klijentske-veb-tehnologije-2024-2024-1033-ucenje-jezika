import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-indigo-700 text-indigo-100 mt-10'>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
          <div>
            <div className='text-lg font-semibold'>sports.org</div>
            <p className='mt-1 text-sm text-indigo-200'>
              Plan, organize & track sports events and tournaments.
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <a
              href='mailto:info@sports.org'
              className='flex items-center gap-1 hover:text-white transition'
            >
              <Mail className='h-4 w-4' aria-hidden='true' /> Email
            </a>
            <a
              href='https://github.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 hover:text-white transition'
            >
              <Github className='h-4 w-4' aria-hidden='true' /> GitHub
            </a>
          </div>
        </div>

        <div className='my-6 h-px w-full bg-indigo-600' />

        <div className='flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4'>
          <p className='text-xs'>
            &copy; {new Date().getFullYear()} sports.org — All rights reserved.
          </p>

          <nav className='flex flex-wrap items-center gap-3'>
            <a href='/' className='text-sm hover:text-white transition'>
              Home
            </a>
            <a href='/events' className='text-sm hover:text-white transition'>
              Events
            </a>
            <a href='/new' className='text-sm hover:text-white transition'>
              Add Event
            </a>
            <a href='/contact' className='text-sm hover:text-white transition'>
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

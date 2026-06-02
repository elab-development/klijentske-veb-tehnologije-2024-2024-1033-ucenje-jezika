export default function Footer() {
  return (
    <footer className='mt-10 border-t border-slate-200 bg-white/60'>
      <div className='container mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
          <p>
            © {new Date().getFullYear()} Paws & Friends. All rights reserved.
          </p>
          <p className='text-slate-500'>
            Built with React, Vite, TypeScript & TailwindCSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

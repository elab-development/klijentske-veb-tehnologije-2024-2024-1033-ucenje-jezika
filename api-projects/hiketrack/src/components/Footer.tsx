export default function Footer() {
  return (
    <footer className='bg-emerald-900 text-emerald-100'>
      <div className='mx-auto max-w-6xl px-4 py-6 text-sm flex items-center justify-between'>
        <p>&copy; {new Date().getFullYear()} HikeTrack</p>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import { FaSort } from 'react-icons/fa';

type SortKey = 'default' | 'rating' | 'name';

export default function SortMenu({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  function pick(v: SortKey) {
    onChange(v);
    setOpen(false);
  }

  return (
    <div className='relative' ref={ref}>
      <button
        type='button'
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className='inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500'
        title='Sort'
      >
        <FaSort className='h-4 w-4' />
        <span className='hidden sm:inline text-sm'>Sort</span>
      </button>

      {open && (
        <div
          role='menu'
          aria-label='Sort options'
          className='absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'
        >
          <button
            role='menuitem'
            onClick={() => pick('default')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
              value === 'default' ? 'bg-pink-50 text-pink-700' : 'text-gray-700'
            }`}
          >
            Default
          </button>
          <button
            role='menuitem'
            onClick={() => pick('rating')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
              value === 'rating' ? 'bg-pink-50 text-pink-700' : 'text-gray-700'
            }`}
          >
            Rating (high → low)
          </button>
          <button
            role='menuitem'
            onClick={() => pick('name')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
              value === 'name' ? 'bg-pink-50 text-pink-700' : 'text-gray-700'
            }`}
          >
            Name (A → Z)
          </button>
        </div>
      )}
    </div>
  );
}

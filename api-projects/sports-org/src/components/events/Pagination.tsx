type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const goto = (p: number) => {
    const clamped = Math.min(Math.max(1, p), totalPages);
    onChange(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buttons = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => {
      const withinWindow =
        p === 1 ||
        p === totalPages ||
        Math.abs(p - page) <= 2 ||
        (page <= 3 && p <= 5) ||
        (page >= totalPages - 2 && p >= totalPages - 4);
      return withinWindow;
    }
  );

  return (
    <div className='flex items-center justify-center gap-2'>
      <button
        className='rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50'
        disabled={page === 1}
        onClick={() => goto(page - 1)}
      >
        Prev
      </button>

      {buttons.map((p) => (
        <button
          key={p}
          onClick={() => goto(p)}
          className={`rounded-md px-3 py-2 text-sm ${
            p === page
              ? 'bg-indigo-600 text-white'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        className='rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50'
        disabled={page === totalPages}
        onClick={() => goto(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

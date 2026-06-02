type Props = { label?: string };

export default function LoadingSpinner({ label = 'Loading…' }: Props) {
  return (
    <div className='fixed inset-0 z-50 grid place-items-center bg-white/60 backdrop-blur-sm'>
      <div className='flex flex-col items-center gap-4'>
        <div
          className='h-24 w-24 animate-spin rounded-full'
          style={{
            background:
              'conic-gradient(#6366f1,#06b6d4,#22c55e,#eab308,#f97316,#ef4444,#a855f7,#6366f1)',
            mask: 'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
            WebkitMask:
              'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
          }}
          aria-hidden='true'
        />
        <p className='text-sm font-medium text-slate-700'>{label}</p>
      </div>
    </div>
  );
}

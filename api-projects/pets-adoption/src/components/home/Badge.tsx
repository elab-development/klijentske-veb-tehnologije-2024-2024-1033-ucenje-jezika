import type React from 'react';

export function Badge({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className='flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700'>
      <span className='inline-grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-700'>
        {icon}
      </span>
      <span className='font-medium'>{title}</span>
    </div>
  );
}

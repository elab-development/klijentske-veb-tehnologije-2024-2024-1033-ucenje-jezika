import type React from 'react';

export function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
      <div className='mb-2 inline-flex items-center gap-2 text-emerald-700'>
        <span className='inline-grid h-9 w-9 place-items-center rounded-lg bg-emerald-100'>
          {icon}
        </span>
        <h3 className='text-base font-semibold'>{title}</h3>
      </div>
      <p className='text-sm text-slate-600'>{desc}</p>
    </div>
  );
}

import { PawPrint } from 'lucide-react';
import type React from 'react';

export function Value({
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

export function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className='rounded-lg border border-slate-200 bg-white p-4'>
      <p className='text-2xl font-extrabold'>{number}</p>
      <p className='text-xs text-slate-500'>{label}</p>
    </div>
  );
}

export function Step({
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

export function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className='flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
      <div className='inline-grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700'>
        <PawPrint className='h-6 w-6' />
      </div>
      <div>
        <p className='font-semibold'>{name}</p>
        <p className='text-sm text-slate-500'>{role}</p>
      </div>
    </div>
  );
}

export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className='group p-4 open:bg-white'>
      <summary className='flex cursor-pointer list-none items-center justify-between gap-4 text-slate-800'>
        <span className='font-medium'>{q}</span>
        <span className='text-slate-400 transition group-open:rotate-180'>
          ▾
        </span>
      </summary>
      <p className='mt-3 text-sm text-slate-600'>{a}</p>
    </details>
  );
}

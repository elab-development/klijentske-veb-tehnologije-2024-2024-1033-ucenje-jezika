import { type ReactNode } from 'react';

type Props = {
  label: string;
  value: ReactNode;
  hint?: string;
};

export default function StatItem({ label, value, hint }: Props) {
  return (
    <div className='rounded-xl bg-white/70 ring-1 ring-orange-100 p-3'>
      <div className='text-xs text-slate-500'>{label}</div>
      <div className='mt-1 text-lg font-semibold text-slate-900'>{value}</div>
      {hint && <div className='text-xs text-slate-500 mt-0.5'>{hint}</div>}
    </div>
  );
}

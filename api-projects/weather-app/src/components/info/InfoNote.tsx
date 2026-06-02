import { type ReactNode } from 'react';
import { Info } from 'lucide-react';

export default function InfoNote({ children }: { children: ReactNode }) {
  return (
    <div className='rounded-xl bg-orange-50/60 ring-1 ring-orange-100 p-3 text-sm text-slate-700 flex items-start gap-2'>
      <Info className='text-orange-600 mt-0.5' size={18} />
      <div>{children}</div>
    </div>
  );
}

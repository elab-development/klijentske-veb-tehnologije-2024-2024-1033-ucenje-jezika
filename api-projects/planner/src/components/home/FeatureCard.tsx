import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  to: string;
  cta: string;
};

export function FeatureCard({ icon, title, desc, to, cta }: FeatureCardProps) {
  return (
    <div className='flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
      <div>
        <div className='mb-3 inline-flex items-center gap-2 rounded-md border border-sky-100 bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700'>
          {icon}
          {title}
        </div>
        <p className='text-sm text-slate-700'>{desc}</p>
      </div>
      <div className='mt-4'>
        <Link
          to={to}
          className='inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline'
        >
          {cta}
          <MoveRight className='h-4 w-4' />
        </Link>
      </div>
    </div>
  );
}

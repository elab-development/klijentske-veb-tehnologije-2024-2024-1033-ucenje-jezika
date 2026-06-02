import { type JSX, type ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

type Variant = 'info' | 'warning' | 'error' | 'success';

type Props = {
  variant?: Variant;
  title: string;
  children?: ReactNode;
  className?: string;
};

const iconByVariant: Record<Variant, JSX.Element> = {
  info: <Info className='text-orange-600 mt-0.5' />,
  warning: <AlertTriangle className='text-orange-600 mt-0.5' />,
  error: <XCircle className='text-red-600 mt-0.5' />,
  success: <CheckCircle2 className='text-green-600 mt-0.5' />,
};

const ringByVariant: Record<Variant, string> = {
  info: 'ring-orange-100',
  warning: 'ring-orange-100',
  error: 'ring-red-100',
  success: 'ring-green-100',
};

const bgByVariant: Record<Variant, string> = {
  info: 'bg-orange-50',
  warning: 'bg-orange-50',
  error: 'bg-white',
  success: 'bg-white',
};

export default function AlertCard({
  variant = 'info',
  title,
  children,
  className = '',
}: Props) {
  return (
    <div
      className={`rounded-3xl ${bgByVariant[variant]} ring-1 ${ringByVariant[variant]} p-6 md:p-8 ${className}`}
    >
      <div className='flex items-start gap-3'>
        {iconByVariant[variant]}
        <div>
          <h2 className='text-xl font-semibold text-slate-900'>{title}</h2>
          {children && <p className='text-slate-600 mt-1'>{children}</p>}
        </div>
      </div>
    </div>
  );
}

type ChartCardProps = {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  heightClassName?: string;
};

export default function ChartCard({
  title,
  hint,
  children,
  className = '',
  heightClassName = 'h-64',
}: ChartCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className='mb-3'>
        <h2 className='text-sm font-semibold text-slate-900'>{title}</h2>
        {hint && <p className='text-xs text-slate-600'>{hint}</p>}
      </div>
      <div className={heightClassName}>{children}</div>
    </div>
  );
}

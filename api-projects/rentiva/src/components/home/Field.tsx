export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className='block text-left'>
      <span className='mb-1 block text-sm font-medium text-slate-600'>
        {label}
      </span>
      {children}
    </label>
  );
}

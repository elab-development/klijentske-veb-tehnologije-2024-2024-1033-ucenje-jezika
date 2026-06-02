const Loading = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className='rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 p-6 md:p-8'>
      <div className='animate-pulse space-y-3'>
        <div className='h-6 w-1/3 bg-slate-200 rounded' />
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className='h-4 w-2/3 bg-slate-200 rounded' />
        ))}
      </div>
    </div>
  );
};

export default Loading;

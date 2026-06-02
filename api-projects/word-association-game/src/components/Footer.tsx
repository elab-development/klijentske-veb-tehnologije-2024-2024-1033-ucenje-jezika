export default function Footer() {
  return (
    <footer className='mt-8 shadow-inner'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <p>
          © {new Date().getFullYear()} Word Association Game. All rights
          reserved.
        </p>
        <p className='inline-flex gap-2'>
          <span className='inline-flex items-center gap-1'>
            <span className='h-3 w-3 rounded-full bg-red-500' /> Red
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='h-3 w-3 rounded-full bg-blue-500' /> Blue
          </span>
        </p>
      </div>
    </footer>
  );
}

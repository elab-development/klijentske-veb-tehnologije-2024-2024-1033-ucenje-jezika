import Navbar from '../components/Navbar';

type AppLayoutProps = {
  bgImage?: string;
  overlay?: number;
  children: React.ReactNode;
};

export default function AppLayout({
  bgImage,
  overlay = 0.45,
  children,
}: AppLayoutProps) {
  return (
    <div className='relative min-h-screen pb-8'>
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=''
            className='pointer-events-none select-none absolute inset-0 h-full w-full object-cover'
          />
          <div
            className='absolute inset-0'
            style={{ background: `rgba(255,255,255,${overlay})` }}
          />
        </>
      )}

      <Navbar />

      <main className='relative z-10 pt-24 md:pt-28'>{children}</main>
    </div>
  );
}

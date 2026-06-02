import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-pink-50 text-center px-6'>
      <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6'>
        Welcome to <span className='text-pink-600'>CatCaffe</span>
      </h1>
      <p className='max-w-2xl text-lg text-gray-700 mb-8'>
        Discover the coziest cat cafés around the world. Enjoy your coffee with
        furry friends and find your next favorite spot to relax.
      </p>
      <Link
        to='/cafes'
        className='px-6 py-3 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition'
      >
        Explore Cafés
      </Link>
    </section>
  );
}

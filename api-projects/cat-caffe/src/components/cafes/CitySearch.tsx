import { IoIosSearch } from 'react-icons/io';

export default function CitySearch({
  city,
  setCity,
  fetchCats,
}: {
  city: string;
  setCity: (value: string) => void;
  fetchCats: () => void;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchCats();
    }
  }

  return (
    <div className='flex w-full max-w-md'>
      <div className='relative flex w-full items-center rounded-full border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-pink-500'>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Enter a city (e.g., London)'
          className='flex-grow rounded-full bg-transparent px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none'
        />
        <button
          type='button'
          onClick={fetchCats}
          className='cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
        >
          <IoIosSearch className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}

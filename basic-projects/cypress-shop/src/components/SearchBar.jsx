export default function SearchBar({ value, onChange }) {
  return (
    <div className='searchbar'>
      <label htmlFor='search' className='sr-only'>
        Search products
      </label>
      <input
        id='search'
        type='text'
        placeholder='Search products…'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-cy='search-input'
      />
      <button
        className='btn'
        onClick={() => onChange('')}
        data-cy='search-clear'
      >
        Clear
      </button>
    </div>
  );
}

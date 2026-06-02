import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className='holder'>
      <header className='header'>
        <div className='header-content flex flex-c text-center text-white'>
          <h2 className='header-title text-capitalize'>
            find your book of choice.
          </h2>
          <br />
          <p className='header-text fs-18 fw-3'>
            Dive into a world of endless stories and knowledge. Whether you are
            searching for a gripping novel, a study resource, or your next big
            inspiration, our library has it all. Use the search below to
            discover your perfect read in seconds.
          </p>
          <SearchForm />
        </div>
      </header>
    </div>
  );
};

export default Hero;

import LoaderImg from '../assets/loader.svg';

const Loader = () => {
  return (
    <div className='loader flex flex-c'>
      <img src={LoaderImg} alt='loader' />
    </div>
  );
};

export default Loader;

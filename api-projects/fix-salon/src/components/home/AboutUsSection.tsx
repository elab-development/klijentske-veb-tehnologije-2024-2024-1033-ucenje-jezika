import { useNavigate } from 'react-router-dom';

import nails from '../../assets/home/nails-aboutus.png';

const AboutUsSection = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-primary w-full flex justify-center mb-10'>
      <div className='max-w-4xl bg-primary flex flex-col sm:flex-row'>
        <div className='flex-1 flex justify-center items-center'>
          <img src={nails} alt='nails' className='p-4 h-60 w-auto' />
        </div>

        <div className='max-w-lg font-semibold mx-auto gap-3 flex-1 flex flex-col items-center justify-center'>
          <h3 className='text-xl'>Dobrodošli u naš salon lepote!</h3>
          <p className='text-center'>
            U centru grada, spoj opuštanja i luksuza. Naš stručni tim posvećen
            je Vašoj lepoti. Koristimo najkvalitetnije proizvode i tehnike za
            svež i glamurozni izgled. Vaša lepota je naša strast.
          </p>
          <button
            type='button'
            onClick={() => navigate('/about')}
            className='bg-secondary font-thin text-white text-2xl px-5 py-1 hover:bg-tertiary mb-5 sm:mb-0'
          >
            Još o nama...
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;

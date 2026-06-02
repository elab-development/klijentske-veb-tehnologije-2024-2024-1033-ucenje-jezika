import { useState } from 'react';
import nails1 from '../../assets/services/nails/nails1.png';
import nails2 from '../../assets/services/nails/nails2.png';
import nails3 from '../../assets/services/nails/nails3.png';
import nails4 from '../../assets/services/nails/nails4.png';
import nails5 from '../../assets/services/nails/nails5.png';
import nails6 from '../../assets/services/nails/nails6.png';
import nails7 from '../../assets/services/nails/nails7.png';
import nails8 from '../../assets/services/nails/nails8.png';
import nails9 from '../../assets/services/nails/nails9.png';

const nailsArray = [
  {
    id: 1,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails1}
        alt='nails1'
      />
    ),
  },
  {
    id: 2,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails2}
        alt='nails2'
      />
    ),
  },
  {
    id: 3,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails3}
        alt='nails3'
      />
    ),
  },
  {
    id: 4,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails4}
        alt='nails4'
      />
    ),
  },
  {
    id: 5,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails5}
        alt='nails5'
      />
    ),
  },
  {
    id: 6,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails6}
        alt='nails6'
      />
    ),
  },
  {
    id: 7,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails7}
        alt='nails7'
      />
    ),
  },
  {
    id: 8,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails8}
        alt='nails8'
      />
    ),
  },
  {
    id: 9,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={nails9}
        alt='nails9'
      />
    ),
  },
];

const NailsView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(nailsArray.length / 3);

  return (
    <div className='w-full flex flex-col justify-center items-center mt-10 bg-primary p-3'>
      <div className='max-w-xl bg-white text-tertiary font-bold text-xl p-3'>
        Prepustite se nasem ISKUSNOM osoblju koje ce pazljivo oblikovati i
        ukrasiti Vase nokte, stvarajuci elegantne i sofisticirane dizajne koji
        ce privuci poglede i naglasiti Vasu individualnost.
      </div>

      <div className='my-10 flex flex-col sm:flex-row items-center justify-center gap-10'>
        {nailsArray.slice(currentPage * 3 - 3, currentPage * 3).map((nail) => (
          <div key={nail.id}>{nail.image}</div>
        ))}
      </div>

      <div className='flex gap-2 font-bold text-2xl mb-5'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${
              currentPage === index + 1 ? 'bg-tertiary' : 'bg-secondary'
            }  text-white px-3 rounded-full cursor-pointer`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NailsView;

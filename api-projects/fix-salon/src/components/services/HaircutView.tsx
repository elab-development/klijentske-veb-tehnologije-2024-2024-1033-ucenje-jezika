import { useState } from 'react';
import haircut1 from '../../assets/services/haircut/haircut1.png';
import haircut2 from '../../assets/services/haircut/haircut2.png';
import haircut3 from '../../assets/services/haircut/haircut3.png';
import haircut4 from '../../assets/services/haircut/haircut4.png';
import haircut5 from '../../assets/services/haircut/haircut5.png';
import haircut6 from '../../assets/services/haircut/haircut6.png';
import haircut7 from '../../assets/services/haircut/haircut7.png';
import haircut8 from '../../assets/services/haircut/haircut8.png';
import haircut9 from '../../assets/services/haircut/haircut9.png';

const haircutArray = [
  {
    id: 1,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut1}
        alt='haircut1'
      />
    ),
  },
  {
    id: 2,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut2}
        alt='haircut2'
      />
    ),
  },
  {
    id: 3,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut3}
        alt='haircut3'
      />
    ),
  },
  {
    id: 4,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut4}
        alt='haircut4'
      />
    ),
  },
  {
    id: 5,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut5}
        alt='haircut5'
      />
    ),
  },
  {
    id: 6,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut6}
        alt='haircut6'
      />
    ),
  },
  {
    id: 7,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut7}
        alt='haircut7'
      />
    ),
  },
  {
    id: 8,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut8}
        alt='haircut8'
      />
    ),
  },
  {
    id: 9,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={haircut9}
        alt='haircut9'
      />
    ),
  },
];

const HaircutView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(haircutArray.length / 3);

  return (
    <div className='w-full flex flex-col justify-center items-center mt-10 bg-primary p-3'>
      <div className='max-w-xl bg-white text-tertiary font-bold text-xl p-3'>
        Bez obzira da li ste muskarac koji trazi precizno oblikovanje brade ili
        zena koja zeli da osvezi svoj izgled s elegantnom frizurom, nas strucni
        tim frizera posvecen je tome da vam pruzi personalizovanu uslugu i
        neodoljivu estetiku.
      </div>

      <div className='my-10 flex flex-col sm:flex-row items-center justify-center gap-10'>
        {haircutArray
          .slice(currentPage * 3 - 3, currentPage * 3)
          .map((haircut) => (
            <div key={haircut.id}>{haircut.image}</div>
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

export default HaircutView;

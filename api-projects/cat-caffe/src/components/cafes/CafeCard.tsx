import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import PlaceholderImg from '../../assets/placeholder.png';
import type { ICatCafe } from '../../types/cafe';

type CafeCardProps = {
  cafe: ICatCafe;
};

const CafeCard = ({ cafe }: CafeCardProps) => {
  return (
    <li key={cafe.id} className='rounded-xl shadow-md bg-white p-4'>
      <Link to={`/cafes/${cafe.id}`} className='block'>
        <img
          src={cafe.photoUrl || PlaceholderImg}
          alt={cafe.name}
          className='mb-3 h-40 xl:h-80 w-full rounded-lg object-cover'
        />

        <h3 className='text-lg font-semibold text-gray-800'>{cafe.name}</h3>
        <p className='text-sm text-gray-600'>{cafe.address}</p>
        <div className='mt-2 text-sm text-gray-700'>
          {cafe.rating ? (
            <div className='flex items-center gap-1'>
              <FaStar className='text-yellow-400' />
              <span>
                {cafe.rating} ({cafe.ratingsCount ?? 0})
              </span>
            </div>
          ) : (
            'No rating'
          )}
        </div>
      </Link>
    </li>
  );
};

export default CafeCard;

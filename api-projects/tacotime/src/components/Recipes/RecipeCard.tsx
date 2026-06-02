import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LuClock } from 'react-icons/lu';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';

import foodTray from '../../assets/food-tray.png';
import GlobalContext from '../../context/GlobalContext';

interface RecipeCardProps {
  link: string;
  image: string;
  title: string;
  prepareTime: string;
  difficulty: string;
  id: number;
}

const RecipeCard = ({
  link,
  image,
  title,
  prepareTime,
  difficulty,
  id,
}: RecipeCardProps) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('There is a problem with the ContextWrapper!');
  }
  const { favorites, setFavorites } = context;

  const handleFavorite = () => {
    let newFavorites: number[] = [];
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((fav) => fav !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
  };

  return (
    <div className='card'>
      <Link to={link}>
        <img src={image} alt={title} className='recipeimg' />
        <h5>{title}</h5>
        <div className='recipeinfo row'>
          <div className='row'>
            <LuClock size={24} />
            <p>{prepareTime}</p>
          </div>
          <div className='row'>
            <img src={foodTray} alt='food-tray' />
            <p>{difficulty}</p>
          </div>
        </div>
      </Link>

      <div className='like row' onClick={handleFavorite}>
        {favorites.includes(id) ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
};

export default RecipeCard;

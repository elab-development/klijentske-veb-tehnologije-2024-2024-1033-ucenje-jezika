import easy from '../../assets/easycat.png';
import medium from '../../assets/mediumcat.png';
import hard from '../../assets/hardcat.png';
import CategoryCard from './CategoryCard';

const CategoryCardsContainer = () => {
  return (
    <div className='category-cards column'>
      <CategoryCard
        link={'/recipes?difficulty=easy'}
        image={easy}
        text='Easy'
        background='linear-gradient(180deg,rgba(177, 227, 145, 0) 0%,rgba(177, 227, 145, 1) 100%)'
      />
      <CategoryCard
        link={'/recipes?difficulty=medium'}
        image={medium}
        text='Medium'
        background='linear-gradient(180deg,rgba(250, 247, 164, 0) 0%,rgba(250, 247, 164, 1) 100%)'
      />
      <CategoryCard
        link={'/recipes?difficulty=hard'}
        image={hard}
        text='Hard'
        background='linear-gradient(180deg,rgba(246, 145, 131, 0) 0%,rgba(246, 145, 131, 1) 100%)'
      />
    </div>
  );
};

export default CategoryCardsContainer;

import '../../styles/Categories.css';
import CategoryCardsContainer from './CategoryCardsContainer';

const Categories = () => {
  return (
    <section className='category container'>
      <div className='category-title'>
        <h2>Categories</h2>
        <p>
          Explore our collection of Mexican recipes sorted by difficulty level:
          Easy, Medium, and Hard. Find the perfect dish to match your cooking
          skills and enjoy the flavors of Mexico at any level.
        </p>
      </div>
      <CategoryCardsContainer />
    </section>
  );
};

export default Categories;

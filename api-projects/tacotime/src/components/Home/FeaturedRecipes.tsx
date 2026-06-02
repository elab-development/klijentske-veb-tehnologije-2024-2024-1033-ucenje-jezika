import { useContext } from 'react';
import '../../styles/FeaturedRecipes.css';
import RecipeCard from '../Recipes/RecipeCard';
import GlobalContext from '../../context/GlobalContext';

const FeaturedRecipes = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('There is a problem with the ContextWrapper!');
  }
  const { recipes } = context;

  return (
    <section className='frecipes container'>
      <div className='section-title'>
        <h2> Try this delicious recipes to make your day</h2>
        <p>
          Choose from a variety of delicious Mexican recipes to make your day
          special. Whether you're in the mood for something easy or looking to
          try a more challenging dish, we've got the perfect recipe for you!
        </p>
      </div>
      <div className='frecipe-cards column'>
        {recipes?.slice(0, 10).map((recipe, index) => (
          <RecipeCard
            key={index}
            link={`recipes/${recipe.id}`}
            image={recipe.image}
            title={recipe.title}
            difficulty={recipe.difficulty}
            prepareTime='30min'
            id={recipe.id}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;

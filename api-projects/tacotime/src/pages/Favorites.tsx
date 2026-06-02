import { useContext, useEffect, useState } from 'react';

import '../styles/Recipes.css';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/Recipes/RecipeCard';
import { Recipe } from '../models/recipes';

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('There is a problem with the ContextWrapper!');
  }

  const { recipes, favorites } = context;

  useEffect(() => {
    let favRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
    setFavoriteRecipes(favRecipes);
  }, [recipes]);

  return (
    <section className='recipes'>
      <div className='section-title'>
        <h2>Your Favorite Recipes</h2>
      </div>

      <div className='filters'>
        <div className='filter'></div>
      </div>

      {favoriteRecipes?.length > 0 ? (
        <div className='frecipe-cards column'>
          {favoriteRecipes?.map((recipe, index) => (
            <RecipeCard
              key={index}
              link={`/recipes/${recipe.id}`}
              image={recipe.image}
              title={recipe.title}
              difficulty={recipe.difficulty}
              prepareTime='30min'
              id={recipe.id}
            />
          ))}
        </div>
      ) : (
        <p>You have not added any recipes to your Favorites!</p>
      )}
    </section>
  );
};

export default Favorites;

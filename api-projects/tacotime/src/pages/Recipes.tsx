import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/Recipes.css';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/Recipes/RecipeCard';
import { Recipe } from '../models/recipes';
import CategoryCardsContainer from '../components/Home/CategoryCardsContainer';

const Recipes = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<string>('all');

  /* Custom hook */
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('There is a problem with the ContextWrapper!');
  }

  const { recipes } = context;

  useEffect(() => {
    if (recipes) {
      setFilteredRecipes(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    let pages: number[] = [];
    for (let i = 1; i <= Math.ceil(filteredRecipes?.length / 20); i++) {
      pages.push(i);
    }
    setPagesArray(pages);
    setCurrentPage(1);
  }, [filteredRecipes]);

  useEffect(() => {
    let queryDifficulty = query.get('difficulty');
    if (queryDifficulty) {
      setDifficulty(queryDifficulty);
    }
  }, [query]);

  useEffect(() => {
    if (difficulty && difficulty !== 'all') {
      let recipesByDifficulty: Recipe[] = [];
      recipesByDifficulty = recipes.filter(
        (recipe) => recipe.difficulty.toLowerCase() === difficulty
      );
      setFilteredRecipes(recipesByDifficulty);
    }
  }, [difficulty]);

  return (
    <section className='recipes'>
      <div className='section-title'>
        <h2>Our Recipes</h2>
      </div>

      <CategoryCardsContainer />

      <div className='frecipe-cards column'>
        {filteredRecipes
          ?.slice(currentPage * 20 - 20, currentPage * 20)
          .map((recipe, index) => (
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

      <div className='pagination'>
        {pagesArray.map((page) => (
          <p
            key={page}
            className={`pagination-box ${
              page === currentPage && 'pagination-active'
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Recipes;

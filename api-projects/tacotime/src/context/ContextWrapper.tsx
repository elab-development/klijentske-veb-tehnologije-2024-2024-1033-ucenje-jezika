import React, { useEffect, useState } from 'react';

import GlobalContext from './GlobalContext';
import { Recipe } from '../models/recipes';
import { getRecipes } from '../utils/recipesAPI';

const ContextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const allRecipesData = await getRecipes();
      let recipesArray: Recipe[] = [];

      allRecipesData.forEach((recipe: any) => {
        let newRecipe = new Recipe(
          recipe.id,
          recipe.title,
          recipe.image,
          recipe.difficulty
        );
        recipesArray.push(newRecipe);
      });

      setRecipes(recipesArray);
    };

    const fetchFavorites = () => {
      let favoritesString = localStorage.getItem('favorites');
      if (favoritesString) {
        const parsedFavorites = JSON.parse(favoritesString);
        setFavorites(parsedFavorites);
      }
    };

    fetchRecipes();
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (favorites) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <GlobalContext.Provider
      value={{ recipes, setRecipes, favorites, setFavorites }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;

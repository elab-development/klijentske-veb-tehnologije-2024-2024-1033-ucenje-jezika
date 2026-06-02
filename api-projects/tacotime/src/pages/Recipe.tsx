import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LuClock } from 'react-icons/lu';

import '../styles/Recipe.css';
import foodTray from '../assets/food-tray.png';
import { RecipeDetails } from '../models/recipeDetails';
import { getRecipeDetails } from '../utils/recipesAPI';

const Recipe = () => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(
    null
  );

  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      let response = null;
      if (id) {
        response = await getRecipeDetails(id);

        let newRecipeDetails = new RecipeDetails(
          response.id,
          response.title,
          response.image,
          response.difficulty,
          response.description,
          response.ingredients,
          response.method,
          response.portion,
          response.time
        );

        setRecipeDetails(newRecipeDetails);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  return (
    <>
      {recipeDetails ? (
        <div className='recipeDetails'>
          <div className='detailsContainer'>
            <div className='detailsContent'>
              <h2 className='balooFont'>{recipeDetails?.title}</h2>
              <p>{recipeDetails?.description}</p>
              <div className='detailsIcons row'>
                <div className='row'>
                  <LuClock size={24} />
                  <p>{recipeDetails?.getTimeForContent()}</p>
                </div>
                <div className='row'>
                  <img src={foodTray} alt='food-tray' />
                  <p>{recipeDetails?.difficulty}</p>
                </div>
              </div>
            </div>
            <div className='detailsImg'>
              <img src={recipeDetails?.image} alt={recipeDetails?.title} />
            </div>
          </div>

          <div className='ingredientsSection'>
            <h3>Ingredients</h3>
            <div className='ingredients'>
              {recipeDetails?.ingredients.map((ingredient, index) => (
                <p key={index}>
                  {index + 1}. {ingredient}
                </p>
              ))}
            </div>
          </div>

          <div className='methodSection'>
            <h3>Method</h3>
            <div className='method'>
              {recipeDetails?.formatMethod().map((step, index) => (
                <p key={index}>
                  <span>Step {index + 1}: </span>
                  {step}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>No details! Check your API!</div>
      )}
    </>
  );
};

export default Recipe;

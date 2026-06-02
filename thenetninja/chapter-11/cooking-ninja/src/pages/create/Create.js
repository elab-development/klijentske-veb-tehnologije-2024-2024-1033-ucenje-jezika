import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

// styles
import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientsInput = useRef(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes' };
    
    try {
      await projectFirestore.collection('recipes').add(doc);
      navigate('/');
    } catch(err) {
      console.log(err.message);
    }
    
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if(ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    setNewIngredient('');
    ingredientsInput.current.focus(); // to stay inside of the input box
  };

  return (
    <div className='create'>
        <h2 className='page-title'>Add a New Recipe</h2>

        <form onSubmit={handleSubmit}>

          <label>
            <span>Recipe title:</span>
            <input 
              type="text"
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
              required
            />
          </label>

          <label>
            <span>Recipe method:</span>
            <textarea 
              onChange={(e) => setMethod(e.target.value)} 
              value={method}
              required
            />
          </label>

          <label>
            <span>Recipe ingredients:</span>
            <div className='ingredients'> 
              <input 
                type="text" 
                onChange={(e) => setNewIngredient(e.target.value)}
                value={newIngredient}
                ref={ingredientsInput}
              />
              <button onClick={handleAdd} className='btn'>Add</button>
            </div>
          </label>
          <p>Current ingredients: {ingredients.map(ing => <em>{ing}, </em>)}</p>

          <label>
            <span>Cooking Time (minutes)</span>
            <input
              type="number"
              onChange={(e) => setCookingTime(e.target.value)}
              value={cookingTime}
              required
            />
          </label>

          <button className='btn'>Submit</button>

        </form>

    </div>
  )
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/RecipeDetails.css";

import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const apiKey = "adcc7c1392d74a7da9b48405a5efe331";
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );

        if (response.status === 200) {
          setRecipe(response.data);
        } else {
          setError("Failed to fetch recipe details.");
        }
      } catch (error) {
        setError(`Error while fetching recipe details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    getRecipeDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recipe) {
    return <div className="error">Failed to load recipe details.</div>;
  }
  console.log(recipe);
  return (
    <div className="recipe-detail">
      <h1 className="recipe-title">{recipe.title}</h1>
      <img className="recipe-image" src={recipe.image} alt={recipe.title} />
      <div className="section">
        <h2>Ingredients:</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Cuisine Type:</h2>
        <ul>
          {recipe.cuisines.length > 0 ? (
            recipe.cuisines.map((cuisine, index) => (
              <li key={index}>{cuisine}</li>
            ))
          ) : (
            <li>No cuisine information available</li>
          )}
        </ul>
      </div>

      <div className="section">
        <h2>Dish Type:</h2>
        {recipe.dishTypes.length > 0 ? (
          recipe.dishTypes.map((dish, index) => <li key={index}>{dish}</li>)
        ) : (
          <li>No dish available </li>
        )}
      </div>
      <div className="section">
        <h2>Instructions:</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
      </div>
    </div>
  );
}

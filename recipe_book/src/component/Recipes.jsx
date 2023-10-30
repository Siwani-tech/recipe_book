
import { useEffect, useState } from "react";
import "./css/recipes.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("pasta"); 

  const getUpdatedRecipes = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  useEffect(() => {
    async function getRecipes() {
      try {
        const apiKey ="adcc7c1392d74a7da9b48405a5efe331";
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
        );
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }

    getRecipes();
  }, [query]);
   
  console.log(recipes)

  return (
    <div className="recipe_container">
      <form onSubmit={getUpdatedRecipes}>
        <input
          type="text"
          name="recipe_text"
          id="recipes_name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for recipes..."
        />
        <button type="submit" className="search_btn">
          Search
        </button>
      </form>

      <h2 className="recipes">Recipe name</h2>

      <div className="recipes-list">
        {recipes.map((recipe) => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
            <div className="recipe-item">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import RecipeDetails from "./component/RecipeDetails";
import Recipes from "./component/Recipes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App(){

  return(

    <>

    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Recipes/>}/>
    <Route path="/recipes/:id" element={<RecipeDetails/>} />



    </Routes>
    </BrowserRouter>
    
    </>
  )
}
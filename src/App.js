import React,{useEffect,useState} from 'react'
import './App.css';
import Recipe from './Recipe'





const App=()=> {

  const APP_ID ='2e1184b7';
  const APP_KEY='7a259ab4549069318d67908dc7201f89'

  const [recipes,setRecipes] =useState([])
  const [search,setSearch] =useState('')
  const [query,setQuery]=useState('chicken')


 


  useEffect(async ()=>{
    getRecipes()

  },[query])


  const getRecipes=async ()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data=await response.json()
    setRecipes(data.hits)
    console.log(data.hits)


  }

  const updateResearch=e=>{
    setSearch(e.target.value)
  }

  const getSearch=(e)=>{
    e.preventDefault();
    setQuery(search)

  }



  return (
    <div className="App">
      <div className ='head'>
      <p className='brand'>Cook & Eat ®</p>
     <form onSubmit={getSearch}   className='search-form'>
     <input className='search-bar' type='text' value={search} onChange={updateResearch}/>
     <button className='search-button' type='submit'>Search</button>
     </form>
     <p className='second-brand'>Only food...</p>
     </div>
     <div className='recipes'>
     {recipes.map(recipe=>(
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image} 
      ingredients={recipe.recipe.ingredients}
      />
      ))}
     </div>
    </div>
  );
}

export default App;

import Search from '../Models/Search'
import Recipe from '../Models/Recipe'
import List from '../Models/List'
import Likes from '../Models/Likes'
import * as recipeView from '../Views/recipeView'
import * as searchView from '../Views/searchView'
import * as listView from '../Views/listView'
import * as likesView from '../Views/likesView'
import {elements, renderLoader, clearLoader} from '../Views/base'

/*	Global state of the app 
	- Search object : search query and search result
	- Current recipe object 
	- Shopping list object
	- Liked recipes
*/
const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
	// Get the query 
	const query = searchView.getInput(); 

	if(query){
		// New search object and add to states
		state.search = new Search(query)

		// Prepare UI for results
		searchView.clearInput()
		searchView.clearResults()
		renderLoader(elements.searchRes)

		try{
			// Search for recipe - wait until the promise return
			await state.search.getResult()

			// Render result on UI
			clearLoader();
			searchView.renderResult(state.search.result)

		}catch(error){
			alert("Something went wrong with the search")
			clearLoader();
		}
		
	}
}

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
	controlSearch()
})

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline')
	if(btn){
		searchView.clearResults()
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.renderResult(state.search.result, goToPage)
	}
})

// RECIPE CONTROLLER
const controlRecipe = async () => {
	// Get id from URL 
	const id = window.location.hash.replace('#', ''); 
	if(id){
		// Prepare UI for changes
		recipeView.clearRecipe()
		listView.clearViews()
		renderLoader(elements.recipe)

		// Create new recipe object
		state.recipe = new Recipe(id)

		try{
			// Get recipe data and parse ingredients
			await state.recipe.getRecipe(); 

			// Calculate servings and data 
			state.recipe.calcServing();

			// Render recipe
			clearLoader(); 
			// whenever we reload the page we do not have the state.Likes property yet
			// databaseView.getInfo(state.recipe)
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))

		}catch (error){
			console.log(error)
			alert("Error processing recipe")
		}

		state.list = new List()
		// add each ingredient to the list 
		state.recipe.photos.forEach(el => {
			const item = state.list.addItem(el)
			listView.renderItem(item)
		})
	}
}

// window.addEventListener('hashchange', controlRecipe);
// Ex: the user book mark the page with id => this will make it work
// window.addEventListener('load', controlRecipe)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

// LIKES CONTROLLER
const controlLikes = () => {
	if(!state.likes) {
		state.likes = new Likes()
	}
	const currentID = state.recipe.id;

	// User has not yet liked the current recipe
	if(!state.likes.isLiked(currentID)){
		// Add like to the state
		const newLike = state.likes.addLike(currentID, state.recipe.name, state.recipe.rating, state.recipe.image)
		
		// Toggle the button 
		likesView.toggleLikeButton(true)

		// Add like to the UI 
		likesView.renderLikes(newLike)

	// User has liked the current recipe
	}else{
		// Remove like from the state
		state.likes.deleteLike(currentID)

		// Toggle the like button 
		likesView.toggleLikeButton(false)

		// Remove like from UI list 
		likesView.deleteLike(currentID)
	}

	likesView.toggleLikeMenu(state.likes.getNumOfLikes())
}

// Restore liked recipes when the page load
window.addEventListener('load', () => {
	state.likes = new Likes()

	// Restore likes 
	state.likes.readStorage(); 

	// Toggle like menu button
	likesView.toggleLikeMenu(state.likes.getNumOfLikes())

	// Render the existing likes
	state.likes.likes.forEach(like => likesView.renderLikes(like))

})
 
// Handling recipe plus and minus buttons
// all of the target class are all inside of this recipe parent class in html code
elements.recipe.addEventListener('click', e => {
	if(e.target.matches('.btn-decrease, .btn-decrease *')){
		// click on button or any child of that button
		// Decrease button 
		if(state.recipe.seating > 1){
			state.recipe.updateServing('dec')
			recipeView.updateServingIngredient(state.recipe)
		}
	}else if(e.target.matches('.btn-increase, .btn-increase *')){
		// Increase Button
		state.recipe.updateServing('inc')
		recipeView.updateServingIngredient(state.recipe)
	}else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
		// Add ingredients to shopping list
		controlList()
	}else if(e.target.matches('.recipe__love, .recipe__love *')){
		// Like control
		controlLikes()
	}	
})



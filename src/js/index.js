import Search from '../Models/Search'
import Restaurant from '../Models/Restaurant'
import List from '../Models/List'
import Likes from '../Models/Likes'
import * as restaurantView from '../Views/restaurantView'
import * as searchView from '../Views/searchView'
import * as listView from '../Views/listView'
import * as likesView from '../Views/likesView'
import {elements, renderLoader, clearLoader} from '../Views/base'

/*	Global state of the app 
	- Search object : search query and search result
	- Current restaurants object 
	- Photos
	- Liked restaurants
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
			// Search for restaurants - wait until the promise return
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

// RESTAURANT CONTROLLER
const controlRestaurant = async () => {
	// Get id from URL 
	const id = window.location.hash.replace('#', ''); 
	if(id){
		// Prepare UI for changes
		restaurantView.clearRestaurant()
		listView.clearCounter()
		listView.clearViews()
		renderLoader(elements.restaurant)

		// Create new restaurant object
		state.restaurant = new Restaurant(id)

		try{
			// Get restaurant data and parse ingredients
			await state.restaurant.getRestaurant(); 

			// Render restaurant
			clearLoader(); 
			// whenever we reload the page we do not have the state.Likes property yet
			// databaseView.getInfo(state.restaurant)
			restaurantView.renderRestaurant(state.restaurant, state.likes.isLiked(id))

		}catch (error){
			console.log(error)
			alert("Error processing restaurant")
		}

		state.list = new List()
		// add each ingredient to the list 
		state.restaurant.photos.forEach(el => {
			const item = state.list.addItem(el)
			listView.renderItem(item)
		})
	}
}

// window.addEventListener('hashchange', controlRestaurant);
// Ex: the user book mark the page with id => this will make it work
// window.addEventListener('load', controlRestaurant)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRestaurant))

// LIKES CONTROLLER
const controlLikes = () => {
	if(!state.likes) {
		state.likes = new Likes()
	}
	const currentID = state.restaurant.id;

	// User has not yet liked the current restaurant
	if(!state.likes.isLiked(currentID)){
		// Add like to the state
		const newLike = state.likes.addLike(currentID, state.restaurant.name, state.restaurant.rating, state.restaurant.image)
		
		// Toggle the button 
		likesView.toggleLikeButton(true)

		// Add like to the UI 
		likesView.renderLikes(newLike)

	// User has liked the current restaurant
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

// Restore liked restaurants when the page load
window.addEventListener('load', () => {
	state.likes = new Likes()

	// Restore likes 
	state.likes.readStorage(); 

	// Toggle like menu button
	likesView.toggleLikeMenu(state.likes.getNumOfLikes())

	// Render the existing likes
	state.likes.likes.forEach(like => likesView.renderLikes(like))

})
 
// all of the target class are all inside of this restaurant parent class in html code
elements.restaurant.addEventListener('click', e => {
	if(e.target.matches('.restaurant__love, .restaurant__love *')){
		// Like control
		controlLikes()
	}	
})



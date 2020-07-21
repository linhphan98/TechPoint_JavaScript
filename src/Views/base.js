export const elements = {
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'), 
	searchResultList: document.querySelector('.results__list'),
	searchRes: document.querySelector('.results'), 
	searchResPages: document.querySelector('.results__pages'), 
	restaurant: document.querySelector('.restaurant'), 
	photo: document.querySelector('.photo__list'),
	likesMenu: document.querySelector('.likes__field'), 
	likesList: document.querySelector('.likes__list'),
	counter: document.querySelector('.counter'),
	update: document.querySelector('.update')
}

const elementStrings = {
	loader: 'loader'
}

// parent element is the very top class of that chunk of code in html
export const renderLoader = parent => {
	const loader = `
		<div class="${elementStrings.loader}"> 
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			<svg> 
		<div>
	`
	parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`)
	if(loader) {
		loader.parentElement.removeChild(loader)
	}
}
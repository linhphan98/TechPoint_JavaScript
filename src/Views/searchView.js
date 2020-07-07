import {elements} from './base'
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = "";
}

export const clearResults = () => {
	elements.searchResultList.innerHTML = "";
	elements.searchResPages.innerHTML = "";
}


export const limitRestaurantTitle = (title, limit = 17) => {
	const newTitle = []; 

	if(title.length > limit){
		title.split(' ').reduce((acc, cur) => {
			if(acc + cur.length <= limit){
				newTitle.push(cur)
			}
			return acc + cur.length;
		}, 0)
		return `${newTitle.join(' ')} ...`;
	}
	return title;
}

const renderRestaurant = restaurant => {
	const markup = `
						<li>
                            <a class="results__link" href="#${restaurant.id}">
                                <figure class="results__fig">
                                    <img src="${restaurant.image_url}" alt="${restaurant.name}">
                                </figure>
                                <div class="results__data">
                                    <h4 class="results__name">${limitRestaurantTitle(restaurant.name)}</h4>
                                    <p class="results__author">Rating: ${restaurant.rating}</p>
                                </div>
                            </a>
                        </li>
	`
	elements.searchResultList.insertAdjacentHTML('beforeend', markup)
}

// type 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButton = (page, numOfResult, resPerPage) => {
	const pages = Math.ceil(numOfResult/resPerPage); // round up the number 4.4 = 5 instead of 4

	let button; 
	if(page === 1 && pages > 1){
		// only button to go to the next page
		button = createButton(page, 'next')
	}else if(page < pages){
		button = `${createButton(page, 'prev')}
				  ${createButton(page, 'next')}`
	}else if (page === pages && pages > 1) {
		// only button to go back one page 
		button = createButton(page, 'prev')
	}
	elements.searchResPages.insertAdjacentHTML('afterbegin', button)

}

export const renderResult = (restaurants, page = 1, resPerPage = 10) => {
	// render results of current page
	const start = (page - 1) * resPerPage; 
	const end = start + resPerPage;

	restaurants.businesses.slice(start, end).forEach(renderRestaurant)
	// render the pagination button 
	renderButton(page, restaurants.businesses.length, resPerPage)
} 







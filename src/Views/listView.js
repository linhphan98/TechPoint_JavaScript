import {elements} from './base'

export const renderItem = photo => {
	const markup = `
				<li class="shopping__item">
                    <img src="${photo}" class="recipe__img">
                </li>	
	`
	elements.shopping.insertAdjacentHTML('beforeend', markup)
}

export const clearViews = () => {
	elements.shopping.innerHTML = '';
}

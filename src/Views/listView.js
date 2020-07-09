import {elements} from './base'

export const renderItem = photo => {
	const markup = `
				<li class="photo__item">
                    <img src="${photo}" class="restaurant__img">
                </li>	
	`
	elements.photo.insertAdjacentHTML('beforeend', markup)
}

export const clearCounter = () => {
	var port = process.env.PORT || 3000;

	elements.counter.innerHTML = `<button id = "counterButton" onclick="myFunction(${port})" class="heading-2">Show</button>`;
}

export const clearViews = () => {
	elements.photo.innerHTML = '';
}

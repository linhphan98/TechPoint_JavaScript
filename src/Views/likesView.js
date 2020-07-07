import {elements} from './base'
import {limitRestaurantTitle} from './searchView'

export const toggleLikeButton = isLiked => {
	const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'
	// selecting the use element in restaurant__love to change the attribute of outlined or not
	document.querySelector('.restaurant__love use').setAttribute('href', `img/icons.svg#${iconString}`); 
}

export const toggleLikeMenu = numLikes => {
	elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden'
}

export const renderLikes = like => {
	const markup = `
		<li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.name}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRestaurantTitle(like.name)}</h4>
                    <p class="likes__author">${like.rating}</p>
                </div>
            </a>
        </li>
	`
	elements.likesList.insertAdjacentHTML('beforeend', markup)
}

export const deleteLike = id => {
	const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement; 
	if(el) {
		el.parentElement.removeChild(el)
	}
}



import {elements} from './base'
import {Fraction} from 'fractional'

export const clearRecipe = () => {
	elements.recipe.innerHTML = '';
}

const combineService = ser => {
    if(ser.length === 0) return "Dine In";
    return ser.join(" + ")
}

const open = hr => {
    var html = [];
    var i;
    var date = ["Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday","Sunday"];

    for(i = 0; i < hr.length; i++){
        var start = hr[i].start;
        var end = hr[i].end;

        if(hr[i].is_overnight){                                 
            html.push(`<li>${date[hr[i].day]} - Operate Overnight - Open from ${[start.slice(0,2), ':',start.slice(2)].join('')} to ${[end.slice(0,2), ':',end.slice(2)].join('')}</li>`)
        }else{
            html.push(`<li>${date[hr[i].day]} - Not Operate Overnight - Open from ${[start.slice(0,2), ':',start.slice(2)].join('')} to ${[end.slice(0,2), ':',end.slice(2)].join('')}</li>`)
        }
    }

    return html;
}

const food = val => {
    var html = []
    var i;
    for(i = 0; i < val.length; i++){
        html.push(`<li>${val[i].title}</li>`)
    }
    return html;
}

// we also need to know if the recipe is liked or not to put the like button up at the very beginning
export const renderRecipe = (recipe, isLiked) => {
	const markup = `
		<figure class="recipe__fig">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.name}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.price}</span>
                    <span class="recipe__info-text"> PRICE</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${combineService(recipe.service)}</span>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul>
                    ${food(recipe.cuisine).join('')}
                    ${open(recipe.openHr).join('')}
                    <li>${recipe.address}</li>
                    <li>${recipe.phoneNum}</li>
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">RATING</h2>
                <p class="recipe__directions-text">
                    This restaurant currently has 
                    <span class="recipe__by">${recipe.rating}</span> star rating. Please check out the YELP website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>WEBSITE</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
	`
	elements.recipe.insertAdjacentHTML('afterbegin', markup);
}

export const updateServingIngredient = recipe => {
	// update servings
	document.querySelector('.recipe__info-data--people').textContent = recipe.seating
	
	// update ingredients 
	// const countElements = Array.from(document.querySelectorAll('.recipe__count')); 
	// countElements.forEach((el, i) => {
	// 	el.textContent = formatCount(recipe.ingredients[i].count)
	// })
}



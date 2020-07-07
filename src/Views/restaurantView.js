import {elements} from './base'
import {Fraction} from 'fractional'

export const clearRestaurant = () => {
	elements.restaurant.innerHTML = '';
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

// we also need to know if the restaurant is liked or not to put the like button up at the very beginning
export const renderRestaurant = (restaurant, isLiked) => {
	const markup = `
		<figure class="restaurant__fig">
                <img id = "top_Image" src="${restaurant.image}" alt="${restaurant.id}" class="restaurant__img">
                <h1 class="restaurant__title">
                    <span>${restaurant.name}</span>
                </h1>
            </figure>
            <div class="restaurant__details">
                <div class="restaurant__info">
                    <span class="restaurant__info-data restaurant__info-data--minutes">${restaurant.price}</span>
                    <span class="restaurant__info-text"> PRICE</span>
                </div>
                <div class="restaurant__info">
                    <svg class="restaurant__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="restaurant__info-data restaurant__info-data--people">${combineService(restaurant.service)}</span>

                </div>
                <button class="restaurant__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>

            <div class="restaurant__ingredients">
                <ul>
                    ${food(restaurant.cuisine).join('')}
                    ${open(restaurant.openHr).join('')}
                    <li>${restaurant.address}</li>
                    <li>${restaurant.phoneNum}</li>
                </ul>
            </div>

            <div class="restaurant__directions">
                <h2 class="heading-2">RATING</h2>
                <p class="restaurant__directions-text">
                    This restaurant currently has 
                    <span class="restaurant__by">${restaurant.rating}</span> star rating. Please check out the YELP website.
                </p>
                <a class="btn-small restaurant__btn" href="${restaurant.url}" target="_blank">
                    <span>WEBSITE</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
	`
	elements.restaurant.insertAdjacentHTML('afterbegin', markup);
}


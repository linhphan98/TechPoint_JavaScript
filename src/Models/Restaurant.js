import axios from 'axios'

export default class Restaurant {
	constructor(id){
		this.id = id;
	}

	async getRestaurant(){
		try{
			const apiKey = 'S2WudF_G4sgSQ0ONjnVV6O0-80Vtk9PtYsRI8E_kAmPzkQKfuBTFIl5gPNhl44fZIm80uGPGH4c6Qc7X4QGd-yDiwkiVxbrPaMELdx-_tUCQIWtzADTykK-3cL78XnYx';

			// REST
			let yelpREST = axios.create({
				baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/`,
			  	headers: {
			    	Authorization: `Bearer ${apiKey}`,
			    	"Content-type": "application/json",
			  	},
			})

			await yelpREST(`/businesses/${this.id}`, { 
				params: {} 	
			}).then(({ data }) => {
				this.name = data.name;
				this.image = data.image_url;
				this.url = data.url;
				this.rating = data.rating;
				this.price = data.price;
				this.phoneNum = data.display_phone;
				this.photos = data.photos;
				this.address = data.location.address1 + ", " + data.location.city + ", " + data.location.state;
				this.openHr = data.hours[0].open;
				this.service = data.transactions;
				this.cuisine = data.categories;
			})
		}catch(error){
			console.log(error)
			alert('Something went wrong')
		}
	}
}









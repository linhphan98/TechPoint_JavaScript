import axios from 'axios';

export default class Search{
	constructor(location){
		this.location = location;
	}

	async getResult(){
		try{
			const apiKey = 'S2WudF_G4sgSQ0ONjnVV6O0-80Vtk9PtYsRI8E_kAmPzkQKfuBTFIl5gPNhl44fZIm80uGPGH4c6Qc7X4QGd-yDiwkiVxbrPaMELdx-_tUCQIWtzADTykK-3cL78XnYx';

			let yelpREST = axios.create({
			  baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/`,
			  headers: {
			    Authorization: `Bearer ${apiKey}`,
			    "Content-type": "application/json",
			  },
			})

			await yelpREST(`/businesses/search`, { 
				params: {
					location: `${this.location}`,
					limit : 12 // at least 11
				} 	
			}).then(({ data }) => {
				this.result = data;
				return this.result
			})
		}catch(error){
			alert(error)
		}
	}
}
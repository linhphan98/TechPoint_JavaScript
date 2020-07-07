import axios from 'axios';

export default class Search{
	constructor(location){
		this.location = location;
	}

	async getResult(){
	// const key = 'API key'
	// const proxy = 'https://crossorigin.me/' either that proxy or 'https://cors-anywhere.herokuapp.com/'
	// const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?key=${key}&q=${query}`)
	// make another file to store the proxy and the api key then import from that file
		try{
			// Place holder for Yelp Fusion's API Key. Grab them
			// from https://www.yelp.com/developers/v3/manage_app
			const apiKey = 'S2WudF_G4sgSQ0ONjnVV6O0-80Vtk9PtYsRI8E_kAmPzkQKfuBTFIl5gPNhl44fZIm80uGPGH4c6Qc7X4QGd-yDiwkiVxbrPaMELdx-_tUCQIWtzADTykK-3cL78XnYx';

			// REST
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
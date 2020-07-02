export default class List{
	constructor(){
		this.photos = []
	}

	addItem(photo){
		const newPhoto = photo;
		this.photos.push(newPhoto);
		return newPhoto;
	}
}
export default class Singer{
	constructor({id,name,key}){
		this.id = id;
		this.name = name;
		this.key = key;
		this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`;
	}
}

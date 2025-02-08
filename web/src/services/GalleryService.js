export default class GalleryService {
	constructor(httpClient) {
		this.httpClient = httpClient;
	}

	async fetchCaptures(page) {
		return await this.httpClient.get(`/gallery?page=${page}`);
	}

	async addLike(id) {
		const username = localStorage.getItem('username');
		return await this.httpClient.post(`/gallery/${id}/like`, {}, {
			'operation': 'add',
			'username': username
		});
	}

	async deleteLike(id) {
		const username = localStorage.getItem('username');
		return await this.httpClient.post(`/gallery/${id}/like`, {}, {
			'operation': 'remove',
			'username': username
		});
	}

	async fetchUserLikes() {
		const username = localStorage.getItem('username');
		return await this.httpClient.get('/gallery/likes',{
			'username': username
		});
	}

	async deleteImage(id) {
		return await this.httpClient.delete(`/gallery/${id}`);
	}
}
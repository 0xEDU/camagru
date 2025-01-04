export default class GalleryService {
	constructor(httpClient) {
		this.httpClient = httpClient;
	}

	async fetchCaptures(page) {
		return await this.httpClient.get(`/gallery?page=${page}`);
	}

	async addLike(id) {
		return await this.httpClient.post(`/gallery/${id}/like`, {}, {
			'operation': 'add'
		});
	}

	async deleteLike(id) {
		return await this.httpClient.post(`/gallery/${id}/like`, {}, {
			'operation': 'remove'
		});
	}
}
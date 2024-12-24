export default class GalleryService {
	constructor(httpClient) {
		this.httpClient = httpClient;
	}

	async fetchCaptures(page) {
		return await this.httpClient.get(`/gallery?page=${page}`);
	}
}
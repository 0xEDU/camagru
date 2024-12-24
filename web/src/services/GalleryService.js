export default class GalleryService {
	constructor(httpClient) {
		this.httpClient = httpClient;
	}

	fetchCaptures(page) {
		return this.httpClient.get(`/captures?page=${page}`);
	}
}
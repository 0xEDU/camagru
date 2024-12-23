class DragDropService {
	constructor(httpClient) {
		this.httpClient = httpClient;
	}

	async getImages() {
        const response = await this.httpClient.get('/superposables');
		return response.data;
	}
}

export default DragDropService;

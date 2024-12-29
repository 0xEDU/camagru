export default class RegisterService {
	constructor(httpClient) {
		this.httpClient = httpClient
	}

	async postRegister(userData) {
		const response = await this.httpClient.post('/register', userData)
		return response
	}
}
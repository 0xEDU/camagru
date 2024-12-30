export default class RegisterService {
	constructor(httpClient) {
		this.httpClient = httpClient
	}

	async postRegister(userData) {
		try {
			const response = await this.httpClient.post('/register', userData)
			return response
		} catch (error) {
			return error.message
		}
	}
}
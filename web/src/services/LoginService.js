export default class LoginService {
	constructor(httpClient) {
		this.httpClient = httpClient
	}

	async postLogin(userData) {
		try {
			const response = await this.httpClient.post('/login', userData);
			return response;
		} catch (error) {
			return error;
		}
	}
}

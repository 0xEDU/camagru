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

	async postForgotPassword(email) {
		try {
			const response = await this.httpClient.post('/login/forgot-password', { email });
			return response;
		} catch (error) {
			return error;
		}
	}
}

class HttpClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async get(endpoint) {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await fetch(url);
		const checkedResponse = await this._checkStatus(response);
		return checkedResponse.json();
	}

	async post(endpoint, data) {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const checkedResponse = await this._checkStatus(response);
		return checkedResponse.json();
	}

	async _checkStatus(response) {
		if (!response.ok) {
			const errorBody = await response.text();
			const errorMessage = JSON.parse(errorBody);
			throw new Error(errorMessage.error, { cause: response.status });
		}
		return response;
	}
}

export default HttpClient;
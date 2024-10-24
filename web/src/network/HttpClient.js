class HttpClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async get(endpoint) {
		try {
			const url = `${this.baseUrl}${endpoint}`;
			const response = await fetch(url);
			const checkedResponse = await this._checkStatus(response);
			return checkedResponse.json();
		} catch (error) {
			return this._handleError(error);
		}
	}

	async post(endpoint, data) {
		try {
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
		} catch (error) {
			return this._handleError(error);
		}
	}

	_checkStatus(response) {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response;
	}

	_handleError(error) {
		console.error(error);
		throw error;
	}
}

export default HttpClient;
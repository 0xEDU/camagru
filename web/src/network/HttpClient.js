class HttpClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async get(endpoint, headers = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: headers,
			credentials: 'include'
		});
		const checkedResponse = await this._checkStatus(response);
		return checkedResponse.json();
	}

	async post(endpoint, data, headers = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		headers['Content-Type'] = 'application/json';
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: headers,
			credentials: 'include'
		});
		const checkedResponse = await this._checkStatus(response);
		return checkedResponse.json();
	}

	async delete(endpoint, headers = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await fetch(url, {
			method: 'DELETE',
			headers: headers,
			credentials: 'include'
		});
		const checkedResponse = await this._checkStatus(response);
		return checkedResponse.json();
	}

	async put(endpoint, data, headers = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		headers['Content-Type'] = 'application/json';
		const response = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: headers,
			credentials: 'include'
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
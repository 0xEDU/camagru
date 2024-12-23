import HttpClient from './network/HttpClient.js';
import { Router } from './router/Router.js';

document.addEventListener('DOMContentLoaded', async () => {
	const baseUrl = 'http://localhost:8042';
	const httpClient = new HttpClient(baseUrl);
	const router = new Router(httpClient);

	await router.navigateTo('/home');
});

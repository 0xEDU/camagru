import HttpClient from './network/HttpClient.js';
import { Router } from './router/Router.js';
import environment from './config/environment.js';

document.addEventListener('DOMContentLoaded', async () => {
	const httpClient = new HttpClient(environment.BASE_URL);
	const router = new Router(httpClient);

	await router.navigateTo('/home');
});

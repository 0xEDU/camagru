import MenuComponent from './components/MenuComponent.js';
import HttpClient from './network/HttpClient.js';
import { Router } from './router/Router.js';
import environment from './config/environment.js';

document.addEventListener('DOMContentLoaded', async () => {
	const httpClient = new HttpClient(environment.BASE_URL);
	const router = new Router(httpClient);

	const menuComponent = new MenuComponent(router);
	menuComponent.initialize();

	await router.navigateTo('/home');
});

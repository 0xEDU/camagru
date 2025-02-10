import MenuComponent from './components/MenuComponent.js';
import MenuService from './services/MenuService.js';
import HttpClient from './network/HttpClient.js';
import { Router } from './router/Router.js';
import environment from './config/environment.js';

document.addEventListener('DOMContentLoaded', async () => {
	const httpClient = new HttpClient(environment.BASE_URL);
	const router = new Router(httpClient);

	const menuService = new MenuService(httpClient);
	const menuComponent = new MenuComponent(router, menuService);
	menuComponent.initialize();

	document.addEventListener('userLogged', async () => {
		await router.navigateTo('/home');
	});

	await router.navigateTo('/');
});

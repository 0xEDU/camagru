import CameraComponent from './components/CameraComponent.js';
import CameraService from './services/CameraService.js';
import DragDropService from './services/DragDropService.js';
import HttpClient from './network/HttpClient.js';
import { Router } from './router/Router.js';
import DragDropComponent from './components/DragDropComponent.js';

document.addEventListener('DOMContentLoaded', async () => {
	const baseUrl = 'http://localhost:8042';
	const httpClient = new HttpClient(baseUrl);
	const router = new Router(httpClient);

	await router.navigateTo('/home');
});

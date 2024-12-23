import CameraComponent from './components/CameraComponent.js';
import CameraService from './services/CameraService.js';
import DragDropService from './services/DragDropService.js';
import HttpClient from './network/HttpClient.js';
import { Router } from './routing/Router.js';
import DragDropComponent from './components/DragDropComponent.js';

document.addEventListener('DOMContentLoaded', async () => {
	const baseUrl = 'http://localhost:8042';
	const httpClient = new HttpClient(baseUrl);
	const router = new Router(httpClient);

	router.registerRoutes([
		'/home',
	]);

	await router.navigateTo('/home');

	const cameraService = new CameraService(httpClient);
	const cameraComponent = new CameraComponent(cameraService);
	await cameraComponent.initialize();

	const dragDropService = new DragDropService(httpClient);
	const dragDropComponent = new DragDropComponent(dragDropService);
	dragDropComponent.initialize();
});

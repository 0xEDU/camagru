import CameraComponent from './components/CameraComponent.js';
import CameraService from './services/CameraService.js';
import DragDropService from './services/DragDropService.js';
import HttpClient from './network/HttpClient.js';
import { Router } from './routing/Router.js';

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

	const dragDropViewModel = new DragDropService(httpClient);
	await dragDropViewModel.fetchSuperposables();
	dragDropViewModel.loadImages();
});

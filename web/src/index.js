import CameraService from './services/CameraService.js';
import DragDropService from './services/DragDropService.js';
import HttpClient from './network/HttpClient.js';
import { Router } from './routing/Router.js';

document.addEventListener('DOMContentLoaded', async () => {
	const baseUrl = 'http://localhost:8080';
	const httpClient = new HttpClient(baseUrl);

	const router = new Router(httpClient);
	router.registerRoutes([
		'/home',
	]);

	await router.navigateTo('/home');

	const cameraViewModel = new CameraService(httpClient);
	await cameraViewModel.initialize();

	const dragDropViewModel = new DragDropService(httpClient);
	await dragDropViewModel.fetchSuperposables();
	dragDropViewModel.loadImages();
});

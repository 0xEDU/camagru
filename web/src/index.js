import CameraViewModel from './ui/viewmodels/CameraViewModel.js';
import DragDropViewModel from './ui/viewmodels/DragDropViewModel.js';
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

	const cameraViewModel = new CameraViewModel(httpClient);
	await cameraViewModel.initialize();

	const dragDropViewModel = new DragDropViewModel(httpClient);
	await dragDropViewModel.fetchSuperposables();
	dragDropViewModel.loadImages();
});

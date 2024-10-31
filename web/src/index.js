import CameraViewModel from './ui/viewmodels/CameraViewModel.js';
import DragDropViewModel from './ui/viewmodels/DragDropViewModel.js';
import HomeViewModel from './ui/viewmodels/HomeViewModel.js';
import HttpClient from './network/HttpClient.js';

document.addEventListener('DOMContentLoaded', async () => {
	const baseUrl = 'http://localhost:8080/api';
	const httpClient = new HttpClient(baseUrl);

	const homeViewModel = new HomeViewModel(httpClient);
	await homeViewModel.initialize();

	const cameraViewModel = new CameraViewModel(httpClient);
	await cameraViewModel.initialize();

	const dragDropViewModel = new DragDropViewModel(httpClient);
	await dragDropViewModel.fetchSuperposables();
	dragDropViewModel.loadImages();
});

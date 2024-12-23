import CameraService from "../services/CameraService";
import CameraComponent from "../components/CameraComponent";
import DragDropService from "../services/DragDropService";
import DragDropComponent from "../components/DragDropComponent";
import GalleryComponent from "../components/GalleryComponent";
import GalleryService from "../services/GalleryService";

const routes = [
	{
		path: '/home',
		async initialize(httpClient) {
			this.components = [];

			const cameraService = new CameraService(httpClient);
			const cameraComponent = new CameraComponent(cameraService);
			this.components.push(cameraComponent);
			await cameraComponent.initialize();

			const dragDropService = new DragDropService(httpClient);
			const dragDropComponent = new DragDropComponent(dragDropService);
			this.components.push(dragDropComponent);
			await dragDropComponent.initialize();
		},
		destroy() {
			this.components.forEach(component => component.destroy());
		}
	},
	{
		path: '/gallery',
		async initialize(httpClient) {
			this.components = [];

			const galleryService = new GalleryService(httpClient);
			const galleryComponent = new GalleryComponent(galleryService);
			await galleryComponent.initialize();
		},
		destroy() {
			this.components.forEach(component => component.destroy());
		}
	},
]

export default routes;
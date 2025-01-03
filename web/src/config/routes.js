import CameraService from "../services/CameraService";
import CameraComponent from "../components/CameraComponent";
import DragDropService from "../services/DragDropService";
import DragDropComponent from "../components/DragDropComponent";
import GalleryComponent from "../components/GalleryComponent";
import GalleryService from "../services/GalleryService";
import RegisterService from "../services/RegisterService";
import RegisterComponent from "../components/RegisterComponent";
import LoginService from "../services/LoginService";
import LoginComponent from "../components/LoginComponent";

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
	{
		path: '/register',
		async initialize(httpClient) {
			this.components = [];

			const registerService = new RegisterService(httpClient);
			const registerComponent = new RegisterComponent(registerService);
			await registerComponent.initialize();
		},
		destroy() {
			this.components.forEach(component => component.destroy());
		}
	},
	{
		path: '/login',
		async initialize(httpClient) {
			this.components = [];

			const registerService = new LoginService(httpClient);
			const registerComponent = new LoginComponent(registerService);
			await registerComponent.initialize();
		},
		destroy() {
			this.components.forEach(component => component.destroy());
		}
	},
]

export default routes;
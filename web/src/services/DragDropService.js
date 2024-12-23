import DragDropModel from '../data/models/DragDropModel.js';
import DragDropComponent from '../components/DragDropComponent.js';

class DragDropService {
	constructor(httpClient) {
		this.dragDropModel = new DragDropModel(httpClient);
	}

	async getImages() {
		await this.dragDropModel.fetchSuperposables();
		return this.dragDropModel.getImages();
	}
}

export default DragDropService;

import DragDropModel from '../data/models/DragDropModel.js';
import DragDropComponent from '../components/DragDropComponent.js';

class DragDropService {
	constructor(httpClient) {
		this.dragDropModel = new DragDropModel(httpClient);
		this.dragDropView = new DragDropComponent();

		this.dragDropView.bindDragOver(this.handleDragOver.bind(this));
		this.dragDropView.bindDrop(this.handleDrop.bind(this));
	}

	handleDragStart(event) {
		event.dataTransfer.setData('text/plain', event.target.id);
	}

	handleDragOver(event) {
		event.preventDefault(); // Necessary to allow dropping
	}

	handleDrop(event) {
		event.preventDefault();
	
		const id = event.dataTransfer.getData('text/plain');
		const draggedElement = document.getElementById(id);
	
		const x = event.clientX - this.dragDropView.dropArea.offsetLeft - (draggedElement.offsetWidth / 2);
		const y = event.clientY - this.dragDropView.dropArea.offsetTop - (draggedElement.offsetHeight / 2);
	
		this.dragDropView.moveElementToDropArea(draggedElement, x, y);
		this.dragDropView.removeElementFromCarousel(draggedElement);
	}

	async fetchSuperposables() {
		await this.dragDropModel.fetchSuperposables();
	}

	loadImages() {
		const images = this.dragDropModel.getImages();
		this.dragDropView.renderImages(images, this.handleDragStart.bind(this));
	}
}

export default DragDropService;

import DragDropModel from '../../data/models/DragDropModel.js';
import DragDropView from '../views/DragDropView.js';

class DragDropViewModel {
	constructor() {
		this.dragDropModel = new DragDropModel();
		this.dragDropView = new DragDropView();

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

	addImage(src) {
		const image = this.dragDropModel.addImage(src);
		this.dragDropView.renderImage(image, this.handleDragStart.bind(this));
	}

	loadImages() {
		const images = this.dragDropModel.getImages();
		this.dragDropView.renderImages(images, this.handleDragStart.bind(this));
	}
}

export default DragDropViewModel;

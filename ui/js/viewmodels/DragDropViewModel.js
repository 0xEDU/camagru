import DragDropModel from '../models/DragDropModel.js';
import DragDropView from '../views/DragDropView.js';

class DragDropViewModel {
	constructor() {
		this.dragDropModel = new DragDropModel();
		this.dragDropView = new DragDropView();

		this.draggedElementId = null;

		this.dragDropView.bindDragOver(this.handleDragOver.bind(this));
		this.dragDropView.bindDrop(this.handleDrop.bind(this));
	}

	handleDragStart(event) {
		this.draggedElementId = event.target.id;
		event.dataTransfer.setData('text/plain', this.draggedElementId);
	}

	handleDragOver(event) {
		event.preventDefault(); // Necessary to allow dropping
	}

	handleDrop(event) {
		event.preventDefault();

		const draggedElement = document.getElementById(this.draggedElementId);

		const x = event.clientX - event.target.offsetLeft - (draggedElement.offsetWidth / 2);
		const y = event.clientY - event.target.offsetTop - (draggedElement.offsetHeight / 2);

		this.dragDropView.moveElementToDropArea(draggedElement, x, y, event.target);
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

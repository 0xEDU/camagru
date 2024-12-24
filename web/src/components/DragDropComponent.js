class DragDropComponent {
	constructor(dragDropService) {
		this.imageCarousel = document.getElementById('image-carousel');
		this.dropArea = document.getElementById('drop-area');

		this.dragDropService = dragDropService;
	}

	async initialize() {
		this.dropArea.addEventListener('dragover', this.handleDragOver.bind(this));
		this.dropArea.addEventListener('drop', this.handleDrop.bind(this));

		const images = await this.dragDropService.getImages();
		this.renderImages(images, this.handleDragStart.bind(this));
	}

	destroy() {
		this.dropArea.removeEventListener('dragover', this.handleDragOver);
		this.dropArea.removeEventListener('drop', this.handleDrop);
	}

	handleDragOver(event) {
		event.preventDefault(); // Necessary to allow dropping
	}

	handleDrop(event) {
		event.preventDefault();
	
		const id = event.dataTransfer.getData('text/plain');
		const draggedElement = document.getElementById(id);
	
		const x = event.clientX - this.dropArea.offsetLeft - (draggedElement.offsetWidth / 2);
		const y = event.clientY - this.dropArea.offsetTop - (draggedElement.offsetHeight / 2);
	
		this._moveElementToDropArea(draggedElement, x, y);
		this._removeElementFromCarousel(draggedElement);
	}

	renderImages(images, onDragStart) {
		this.imageCarousel.innerHTML = ''; // Clear previous images
		images.forEach(image => this._renderImage(image, onDragStart));
	}

	handleDragStart(event) {
		event.dataTransfer.setData('text/plain', event.target.id);
	}

	_renderImage(image, onDragStart) {
		const imgElement = document.createElement('img');
		imgElement.id = image.id;
		imgElement.src = image.src;
		imgElement.alt = 'Draggable Image';
		imgElement.draggable = true;
		imgElement.className = 'cursor-move z-10 object-contain';
		imgElement.style.width = '20%';

		// Bind the dragstart event to the new image
		imgElement.addEventListener('dragstart', onDragStart);

		this.imageCarousel.appendChild(imgElement);
	}

	_moveElementToDropArea(element, x, y) {
		element.style.left = `${x}px`;
		element.style.top = `${y}px`;
		element.style.position = 'absolute';
		this.dropArea.appendChild(element);
	}

	_removeElementFromCarousel(element) {
		if (this.imageCarousel.contains(element)) {
			this.imageCarousel.removeChild(element);
		}
	}
}

export default DragDropComponent;

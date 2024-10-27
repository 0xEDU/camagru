class DragDropView {
	constructor() {
		this.imageCarousel = document.getElementById('image-carousel');
		this.dropArea = document.getElementById('drop-area');
	}

	renderImage(image, onDragStart) {
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

	renderImages(images, onDragStart) {
		this.imageCarousel.innerHTML = ''; // Clear previous images
		images.forEach(image => this.renderImage(image, onDragStart));
	}

	bindDragOver(handler) {
		this.dropArea.addEventListener('dragover', handler);
	}

	bindDrop(handler) {
		this.dropArea.addEventListener('drop', handler);
	}

	moveElementToDropArea(element, x, y) {
		element.style.left = `${x}px`;
		element.style.top = `${y}px`;
		element.style.position = 'absolute';
		this.dropArea.appendChild(element);
		console.log('dropped element at: ', x, y);
	}

	removeElementFromCarousel(element) {
		if (this.imageCarousel.contains(element)) {
			this.imageCarousel.removeChild(element);
		}
	}
}

export default DragDropView;

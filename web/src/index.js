// let video = document.getElementById('user-camera');

// let facingMode = "user";
// let constraints = {
// 	audio: false,
// 	video: {
// 		facingMode: facingMode
// 	}
// };

// navigator.mediaDevices.getUserMedia(constraints)
// 	.then((stream) => {
// 		video.srcObject = stream;
// 	})

// const draggableImage = document.getElementById('draggable-image');
// const dropArea = document.getElementById('drop-area');

// draggableImage.addEventListener('dragstart', (event) => {
// 	event.dataTransfer.setData('text/plain', event.target.id);
// });

// dropArea.addEventListener('dragover', (event) => {
// 	event.preventDefault();
// });

// dropArea.addEventListener('drop', (event) => {
// 	event.preventDefault();

// 	const id = event.dataTransfer.getData('text/plain');
// 	const draggedImage = document.getElementById(id);
// 	const imageCarousel = document.getElementById('image-carousel');

// 	draggedImage.style.left = `${event.clientX - dropArea.offsetLeft - (draggedImage.offsetWidth / 2)}px`;
// 	draggedImage.style.top = `${event.clientY - dropArea.offsetTop - (draggedImage.offsetHeight / 2)}px`;
// 	draggedImage.style.position = 'absolute';
// 	dropArea.appendChild(draggedImage);
// 	if (imageCarousel.contains(draggedImage)) {
// 		imageCarousel.removeChild(draggedImage);
// 	}
// });
import CameraViewModel from './ui/viewmodels/CameraViewModel.js';
import DragDropViewModel from './ui/viewmodels/DragDropViewModel.js';

document.addEventListener('DOMContentLoaded', () => {
	const cameraViewModel = new CameraViewModel();
	cameraViewModel.initialize();

	const dragDropViewModel = new DragDropViewModel();
	dragDropViewModel.addImage('./assets/orange-cat.png');
	dragDropViewModel.addImage('./assets/orange-cat2.png');
	// dragDropViewModel.addImage('./assets/another-cat.png');

	// Load images to the view (if any exist in the model)
	dragDropViewModel.loadImages();
});

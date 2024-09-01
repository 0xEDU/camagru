let video = document.getElementById('user-camera');

let facingMode = "user";
let constraints = {
	audio: false,
	video: {
		facingMode: facingMode
	}
};

navigator.mediaDevices.getUserMedia(constraints)
	.then((stream) => {
		video.srcObject = stream;
	})

const draggableImage = document.getElementById('draggable-image');
const dropArea = document.getElementById('drop-area');

draggableImage.addEventListener('dragstart', (event) => {
	event.dataTransfer.setData('text/plain', event.target.id);
});

dropArea.addEventListener('dragover', (event) => {
	event.preventDefault();
});

dropArea.addEventListener('drop', (event) => {
	event.preventDefault();

	const id = event.dataTransfer.getData('text/plain');
	const draggedImage = document.getElementById(id);
	const imageCarousel = document.getElementById('image-carousel');

	draggedImage.style.left = `${event.clientX - dropArea.offsetLeft - (draggedImage.offsetWidth / 2)}px`;
	draggedImage.style.top = `${event.clientY - dropArea.offsetTop - (draggedImage.offsetHeight / 2)}px`;
	draggedImage.style.position = 'absolute';
	dropArea.appendChild(draggedImage);
	if (imageCarousel.contains(draggedImage)) {
		imageCarousel.removeChild(draggedImage);
	}
});
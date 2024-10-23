import insertElement from '../../libs/tinyDOM/insertElement.js'

class CameraView {
    constructor() {
        this.videoElement = document.getElementById('user-camera');
        this.cameraButton = document.getElementById('camera-button');
        this.imageArea = document.getElementById('drop-area');
        this.lastTakenPicsGallery = document.getElementById('last-taken-pics-gallery')
    }

    bindStream(stream) {
        this.videoElement.srcObject = stream;
    }

    bindCapture(handler) {
        this.cameraButton.addEventListener('click', handler);
    }

    onPictureCaptured(image) {
        this.videoElement.style.display = 'none';

        const capturedImage = `<img src="${image}" alt="Catpured Image" />`;
        insertElement(this.imageArea.id, capturedImage);
    }
}

export default CameraView;
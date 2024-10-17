class CameraView {
    constructor() {
        this.videoElement = document.getElementById('user-camera');
        this.cameraButton = document.getElementById('camera-button');
        this.imageArea = document.getElementById('drop-area');
    }

    bindStream(stream) {
        this.videoElement.srcObject = stream;
    }

    bindCapture(handler) {
        this.cameraButton.addEventListener('click', handler);
    }
}

export default CameraView;
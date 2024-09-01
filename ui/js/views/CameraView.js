class CameraView {
    constructor() {
        this.videoElement = document.getElementById('user-camera');
    }

    bindStream(stream) {
        this.videoElement.srcObject = stream;
    }
}

export default CameraView;
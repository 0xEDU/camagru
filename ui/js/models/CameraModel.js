class CameraModel {
    constructor() {
        this.stream = null;
        this.facingMode = 'user';
    }

    async initializeCamera() {
        const constraints = {
            audio: false,
            video: { facingMode: this.facingMode }
        };
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
        return this.stream;
    }
}

export default CameraModel;
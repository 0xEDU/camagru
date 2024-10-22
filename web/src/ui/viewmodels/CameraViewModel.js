import CameraModel from '../../data/models/CameraModel.js';
import CameraView from '../views/CameraView.js';

class CameraViewModel {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.cameraModel = new CameraModel();
        this.cameraView = new CameraView();

        this.cameraView.bindCapture(this.handleCapture.bind(this));
    }

    async initialize() {
        const stream = await this.cameraModel.initializeCamera();
        this.cameraView.bindStream(stream);
    }

    async handleCapture() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.cameraView.videoElement.clientWidth;
        canvas.height = this.cameraView.videoElement.clientHeight;
        context.drawImage(this.cameraView.videoElement, 0, 0, canvas.width, canvas.height);

        const image = canvas.toDataURL('image/png');

        this.cameraView.videoElement.style.display = 'none';
        this.cameraView.imageArea.innerHTML += `<img src="${image}" alt="Captured Image" />`;

        const body = { "image": image };
        console.log(body);
        await this.httpClient.post('/images', body);
        // this.cameraModel.saveImage(image); later
    }
}

export default CameraViewModel;
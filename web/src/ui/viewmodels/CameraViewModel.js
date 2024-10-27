import CameraModel from '../../data/models/CameraModel.js';
import CameraView from '../views/CameraView.js';

class CameraViewModel {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.cameraModel = new CameraModel();
        this.cameraView = new CameraView();

        this.cameraView.bindCapture(this.handleCapture.bind(this));
        this.cameraView.bindRetry(this.handleRetry.bind(this));
    }

    async initialize() {
        const stream = await this.cameraModel.initializeCamera();
        this.cameraView.bindStream(stream);
    }

    async handleCapture() {
        const encodedImage = await this.cameraView.encodeCapturedImage();

        const body = { "image": encodedImage };
        const response = await this.httpClient.post('/images', body);
        const id = response.data.id;

        this.cameraView.updateLastTakenPicsGallery(id, encodedImage);
    }

    handleRetry() {
        this.cameraView.displayCamera();
    }
}

export default CameraViewModel;
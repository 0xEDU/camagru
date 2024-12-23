import CameraModel from '../data/models/CameraModel.js';
import CameraComponent from '../components/CameraComponent.js';

class CameraService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.cameraModel = new CameraModel();
    }

    async getCameraStream() {
        const stream = await this.cameraModel.initializeCamera();
        return stream;
    }

    async saveEncodedImage(encodedImage) {
        const body = { "image": encodedImage };
        const response = await this.httpClient.post('/images', body);
        return response.data.id;
    }
}

export default CameraService;
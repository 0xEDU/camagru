import CameraModel from '../models/CameraModel.js';
import CameraView from '../views/CameraView.js';

class CameraViewModel {
    constructor() {
        this.cameraModel = new CameraModel();
        this.cameraView = new CameraView();
    }

    async initialize() {
        const stream = await this.cameraModel.initializeCamera();
        this.cameraView.bindStream(stream);
    }
}

export default CameraViewModel;
class CameraService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getCameraStream() {
        const constraints = {
            audio: false,
            video: { facingMode: 'user' }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
    }

    async saveEncodedImage(encodedImage) {
        const body = { 
            "image": encodedImage,
            "username": localStorage.getItem('username')
        };
        const response = await this.httpClient.post('/images', body);
        return response.data.id;
    }

    closeStream(stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
}

export default CameraService;
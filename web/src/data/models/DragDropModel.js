import HttpClient from '../../network/HttpClient.js';

class DragDropModel {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.images = []; // Stores image objects { id, src }
    }

    async fetchSuperposables() {
        const response = await this.httpClient.get('/superposables');
        this.images = response.data;
    }

    addImage(src) {
        const id = `draggable-image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const image = { id, src };
        this.images.push(image);
        return image;
    }

    getImages() {
        return this.images;
    }
}

export default DragDropModel;

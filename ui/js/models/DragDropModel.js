class DragDropModel {
    constructor() {
        this.images = []; // Stores image objects { id, src }
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

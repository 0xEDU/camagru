import insertElement from '../../libs/tinyDOM/insertElement.js'
import deleteElement from '../../libs/tinyDOM/deleteElement.js'

class CameraView {
    constructor() {
        this.videoElement = document.getElementById('user-camera');
        this.cameraButtonSnap = document.getElementById('camera-button-snap');
        this.cameraButtonRetry = document.getElementById('camera-button-retry');
        this.imageArea = document.getElementById('drop-area');
        this.lastTakenPicsGallery = document.getElementById('last-taken-pics-gallery')

        this._parser = new DOMParser();
    }

    bindStream(stream) {
        this.videoElement.srcObject = stream;
    }

    bindCapture(handler) {
        this.cameraButtonSnap.addEventListener('click', handler);
    }

    bindRetry(handler) {
        this.cameraButtonRetry.addEventListener('click', handler);
    }

    displayCamera() {
        this.videoElement.style.display = '';
        deleteElement('captured-image');
    }

    async encodeCapturedImage() {
        const canvas = this._getNewCameraCanvas();
        const draggableImages = this._getDraggableImages(this.imageArea);
        const context = canvas.getContext('2d');
        const drawImagesPromises = draggableImages.map((imageElement) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = imageElement.src;
                img.onload = () => {
                    const x = imageElement.offsetLeft - this.videoElement.offsetLeft;
                    const y = imageElement.offsetTop - this.videoElement.offsetTop;

                    context.drawImage(
                        img,
                        x,
                        y,
                        imageElement.clientWidth,
                        imageElement.clientHeight
                    );
                    resolve();
                };
            });
        });

        return Promise.all(drawImagesPromises).then(() => {
            const encodedImage = canvas.toDataURL('image/png');
            this.videoElement.style.display = 'none';

            const capturedImage = `<img id="captured-image" class="w-9/12 rounded-xl shadow" src="${encodedImage}" alt="Catpured Image" />`;
            insertElement(this.imageArea.id, capturedImage);
            return encodedImage;
        })
    }

    updateLastTakenPicsGallery(id, encodedImage) {
        const imageHtml = `<img id="gallery-image-${id}" class="w-full h-[18vh] p-2 object-scale-down" src="${encodedImage}">`;
        const placeholder = document.getElementById('gallery-placeholder');
        if (!placeholder) {
            const galleryRow = this._getNewGalleryRow(imageHtml);
            insertElement(this.lastTakenPicsGallery.id, galleryRow.outerHTML);
        } else {
            const newImage = this._createElementFromHTML(imageHtml);
            placeholder.replaceWith(newImage);
        }
    }

    _getNewCameraCanvas() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.videoElement.clientWidth;
        canvas.height = this.videoElement.clientHeight;
        context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
        return canvas;
    }

    _getDraggableImages() {
        const siblings = [];
        let sibling = this.imageArea.firstElementChild;

        while (sibling) {
            if (sibling.id && sibling.id.startsWith('draggable-image-') && sibling !== this.imageArea) {
                siblings.push(sibling);
            }
            sibling = sibling.nextElementSibling;
        }
        return siblings;
    }

    _getNewGalleryRow(imageHtml) {
        const galleryRow = document.createElement('div');
        galleryRow.id = 'gallery-row';
        galleryRow.className = 'w-full flex';
        if (!imageHtml) {
            galleryRow.innerHTML += this._getPlaceholder().outerHTML;
        } else {
            galleryRow.innerHTML += imageHtml;
        }
        galleryRow.innerHTML += this._getPlaceholder().outerHTML;
        return galleryRow;
    }

    _getPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.id = 'gallery-placeholder';
        placeholder.className = 'w-full h-[18vh] p-2';
        return placeholder;
    }

    _createElementFromHTML(htmlString) {
        const doc = this._parser.parseFromString(htmlString, 'text/html');
        return doc.body.firstChild;
    }
}

export default CameraView;
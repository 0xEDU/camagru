import insertElement from '../libs/tinyDOM/insertElement';

export default class GalleryComponent {
	constructor(galleryService) {
		this.currentImageId = null;
		this.galleryService = galleryService;

		this.galleryGrid = document.getElementById('gallery-grid');
		this.galleryLoading = document.getElementById('gallery-loading');
		this.modalBackdrop = document.getElementById('modal-backdrop');
		this.openModalButton = document.getElementById('comments-button');
		this.closeModalButton = document.getElementById('close-modal');
		this.commentsBody = document.getElementById('comments-body');
		this.addCommentButton = document.getElementById('add-comment-button');
		this.modalAlert = document.getElementById('modal-alert');

		this.currentPage = 1;
		this.hasMore = true;
	}

	async initialize() {
		this.galleryLoading.style.display = 'none';
		window.addEventListener('scroll', this._debounce(this._handleScroll.bind(this), 200).bind(this));
		const response = await this.galleryService.fetchUserLikes();
		if (!(response instanceof Error)) {
			const userLikes = response.likes;
			for (const item of this.galleryGrid.firstElementChild.children) {
				const id = item.firstElementChild.src.split('.')[0].split('/')[5];
				if (userLikes.includes(id)) {
					item.querySelector('.like-icon').classList.add('liked');
					item.querySelector('.like-icon').classList.remove('bi-heart');
					item.querySelector('.like-icon').classList.add('bi-heart-fill');
				}
				item.imageId = id;
				item.addEventListener('click', this._handleIconClick.bind(this));
			}
		}
		this.closeModalButton.addEventListener('click', this.hideModal.bind(this));
		this.modalBackdrop.addEventListener('click', this.backdrop.bind(this));
		this.addCommentButton.addEventListener('click', this.handleAddComment.bind(this));
	}

	destroy() {
		window.removeEventListener('scroll', this._debounce(this._handleScroll.bind(this), 200).bind(this));
		this.closeModalButton.removeEventListener('click', this.hideModal.bind(this));
		this.modalBackdrop.removeEventListener('click', this.backdrop.bind(this));
	}

	_debounce(func, delay) {
		return (...args) => {
			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(() => func(...args), delay);
		};
	}

	async _handleIconClick(event) {
		switch (true) {
			case event.target.classList.contains('like-icon'): {
				const id = event.target.parentElement.parentElement.parentElement.firstElementChild.src.split('.')[0].split('/')[5];
				let response;
				if (event.target.classList.contains('liked')) {
					event.target.classList.remove('liked');
					event.target.classList.add('bi-heart');
					event.target.classList.remove('bi-heart-fill');
					response = await this.galleryService.deleteLike(id);
				} else {
					event.target.classList.add('liked');
					event.target.classList.remove('bi-heart');
					event.target.classList.add('bi-heart-fill');
					response = await this.galleryService.addLike(id);
				}
				if (!(response instanceof Error)) {
					event.target.nextElementSibling.innerText = response.likes;
				}
				break;
			}
			case event.target.classList.contains('delete-icon'): {
				const id = event.target.parentElement.parentElement.firstElementChild.src.split('.')[0].split('/')[5];
				const response = await this.galleryService.deleteImage(id);
				if (!(response instanceof Error)) {
					event.target.parentElement.parentElement.remove();
				}
				if (this.galleryGrid.firstElementChild.children.length === 0) {
					this.galleryGrid.innerHTML = '<p class="text-center text-gray-500">No images found in the gallery.</p>';
				}
				break;
			}
			case event.target.classList.contains('comments-icon'): {
				this.showModal(event);
			}
		}
	}

	async _handleScroll() {
		const scrollTop = window.scrollY;
		const viewportHeight = window.innerHeight;
		const fullHeight = document.body.offsetHeight;

		if (scrollTop + viewportHeight >= fullHeight - 200 && this.hasMore) {
			this.galleryLoading.style.display = '';
			await this._fetchNextPage();
			this.galleryLoading.style.display = 'none';
		}
	}

	async _fetchNextPage() {
		this.currentPage++;
		const response = await this.galleryService.fetchCaptures(this.currentPage);
		const captures = response.data;
		this.hasMore = response.hasMore;
		insertElement(this.galleryGrid.id, captures)
	}

	async showModal(event) {
		this.modalBackdrop.classList.remove('hidden');
		document.body.classList.add('overflow-hidden');

		const id = event.target.parentElement.parentElement.firstElementChild.src.split('.')[0].split('/')[5];
		this.currentImageId = id;
		const response = await this.galleryService.fetchComments(id);
		insertElement(this.commentsBody.id, response.data);
	}

	hideModal() {
		this.currentImageId = null;
		this.modalBackdrop.classList.add('hidden');
		document.body.classList.remove('overflow-hidden');
		this.commentsBody.innerHTML = '';
	}

	backdrop(event) {
		if (event.target === this.modalBackdrop) {
			this.hideModal();
		}
	}

	async handleAddComment(event) {
		const comment = event.target.previousElementSibling.value;
		try {
			this.modalAlert.innerText = '';
			const response = await this.galleryService.addComment(this.currentImageId, comment);
			this.commentsBody.innerHTML = '';
			insertElement(this.commentsBody.id, response.data);
			event.target.previousElementSibling.value = '';
		} catch(error) {
			this.modalAlert.innerText = error;
		}
	}
}
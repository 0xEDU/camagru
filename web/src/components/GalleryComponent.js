import insertElement from '../libs/tinyDOM/insertElement';

export default class GalleryComponent {
	constructor(galleryService) {
		this.galleryService = galleryService;

		this.galleryGrid = document.getElementById('gallery-grid');
		this.galleryLoading = document.getElementById('gallery-loading');

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
				item.addEventListener('click', this._handleLike.bind(this));
			}
		}
	}

	destroy() {
		window.removeEventListener('scroll', this._debounce(this._handleScroll.bind(this), 200).bind(this));
	}

	_debounce(func, delay) {
		return (...args) => {
			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(() => func(...args), delay);
		};
	}

	async _handleLike(event) {
		const id = event.target.parentElement.parentElement.firstElementChild.src.split('.')[0].split('/')[5] 
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
}
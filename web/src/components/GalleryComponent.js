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
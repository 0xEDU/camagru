export default class GalleryComponent {
	constructor(galleryService) {
		this.galleryService = galleryService;

		this.currentPage = 1;
	}

	async initialize() {
		window.addEventListener('scroll', this._handleScroll);
	}

	_handleScroll() {
		const scrollTop = window.scrollY;
		const viewportHeight = window.innerHeight;
		const fullHeight = document.body.offsetHeight;

		if (scrollTop + viewportHeight >= fullHeight - 200) {
			this._fetchNextPage();
		}
	}

	_fetchNextPage() {
		this.currentPage++;
		this.galleryService.fetchCaptures(this.currentPage);
	}
}
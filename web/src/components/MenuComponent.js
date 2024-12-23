class MenuComponent {
	constructor(router) {
		this.router = router;

		this.galleryButton = document.getElementById('gallery-button');
		this.homeButton = document.getElementById('home-button');
	}

	async initialize() {
		this.galleryButton.addEventListener('click', this.handleGalleryClick.bind(this));
		this.homeButton.addEventListener('click', this.handleHomeClick.bind(this));

	}

	handleGalleryClick() {
		this.router.navigateTo('/gallery');
	}

	handleHomeClick() {
		this.router.navigateTo('/home');
	}
}

export default MenuComponent;
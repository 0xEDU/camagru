class MenuComponent {
	constructor(router) {
		this.router = router;

		this.galleryButton = document.getElementById('gallery-button');
		this.homeButton = document.getElementById('home-button');
		this.loginButton = document.getElementById('login-button');
		this.logoutButton = document.getElementById('logout-button');
		this.registerButton = document.getElementById('register-button');
		this.usernameTitle = document.getElementById('username-title');
	}

	async initialize() {
		this.galleryButton.addEventListener('click', this._handleGalleryClick.bind(this));
		this.homeButton.addEventListener('click', this._handleHomeClick.bind(this));
		this.loginButton.addEventListener('click', this._handleLoginClick.bind(this));
		this.logoutButton.addEventListener('click', this._handleLogoutClick.bind(this));
		this.registerButton.addEventListener('click', this._handleRegisterClick.bind(this));
	}

	_handleGalleryClick() {
		this.router.navigateTo('/gallery');
	}

	_handleHomeClick() {
		this.router.navigateTo('/home');
	}

	_handleLoginClick() {
		this.router.navigateTo('/login');
	}

	_handleLogoutClick() {
		// logout logic will be different
	}

	_handleRegisterClick() {
		this.router.navigateTo('/register');
	}
}

export default MenuComponent;
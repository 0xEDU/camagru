class MenuComponent {
	constructor(router, menuService) {
		this.router = router;
		this.menuService = menuService;

		this.galleryButton = document.getElementById('gallery-button');
		this.homeButton = document.getElementById('home-button');
		this.loginButton = document.getElementById('login-button');
		this.logoutButton = document.getElementById('logout-button');
		this.registerButton = document.getElementById('register-button');
		this.usernameButton = document.getElementById('username-button');
		this.settingsButton = document.getElementById('settings-button');
	}

	async initialize() {
		this.galleryButton.addEventListener('click', this._handleGalleryClick.bind(this));
		this.homeButton.addEventListener('click', this._handleHomeClick.bind(this));
		this.loginButton.addEventListener('click', this._handleLoginClick.bind(this));
		this.logoutButton.addEventListener('click', this._handleLogoutClick.bind(this));
		this.registerButton.addEventListener('click', this._handleRegisterClick.bind(this));
		this.settingsButton.addEventListener('click', this._handleSettingsClick.bind(this));
		if (localStorage.getItem('username')) {
			this._handleUserLogged();
		} else {
			window.addEventListener('userLogged', this._handleUserLogged.bind(this));
		}
	}

	_handleGalleryClick() {
		this.router.navigateTo('/gallery');
	}

	_handleHomeClick() {
		this.router.navigateTo('/');
	}

	_handleLoginClick() {
		this.router.navigateTo('/login');
	}

	async _handleLogoutClick() {
		await this.menuService.handleLogout();
		localStorage.removeItem('username');
		location.reload();
	}

	_handleRegisterClick() {
		this.router.navigateTo('/register');
	}

	_handleSettingsClick() {
		this.router.navigateTo('/settings');
	}

	_handleUserLogged() {
		this.loginButton.classList.add('hidden');
		this.registerButton.classList.add('hidden');
		this.usernameButton.classList.remove('hidden');
		this.logoutButton.classList.remove('hidden');
		this.settingsButton.classList.remove('hidden');

		const username = localStorage.getItem('username');
		this.usernameButton.innerHTML += username;
	}
}

export default MenuComponent;
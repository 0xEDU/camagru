export default class LoginComponent {
	constructor(loginService) {
		this.loginService = loginService;

		this.loginForm = document.getElementById('login-form');
		this.formMessage = document.getElementById('form-message');
	}

    async initialize() {
        this.loginForm.addEventListener('submit', this._handleLogin.bind(this));
    }

    destroy() {
        this.loginForm.removeEventListener('submit', this._handleLogin.bind(this));
    }

    async _handleLogin(event) {
        event.preventDefault();

		const username = document.getElementById('login-username').value.trim();
		const password = document.getElementById('login-password').value;

        const userData = {
            username,
            password
        };

        const response = await this.loginService.postLogin(userData);
		if (response instanceof Error) {
			this._displayErrorMessage([response.message]);
			return;
		}

		this.loginForm.reset();

		this._displaySuccessMessage();
    }

	_displaySuccessMessage() {
		this.formMessage.innerHTML = 'Logged in successfully!';
		this.formMessage.style.color = 'green';
	}

	_displayErrorMessage(errors) {
		this.formMessage.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
		this.formMessage.style.color = 'red';
	}

	_clearErrorMessage() {
		this.formMessage.innerHTML = '';
	}
}
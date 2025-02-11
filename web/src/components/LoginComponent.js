export default class LoginComponent {
	constructor(loginService) {
		this.showForgotPassword = false;

		this.loginService = loginService;

		this.loginForm = document.getElementById('login-form');
		this.formMessage = document.getElementById('form-message');
		
		this.forgotPasswordContainer = document.getElementById('forgot-password-container');
		this.forgotPasswordInput = document.getElementById('forgot-password-email-input');
		this.forgotPasswordShowButton = document.getElementById('forgot-password-show-button');
		this.forgotPasswordSendButton = document.getElementById('forgot-password-send-button');
		this.forgotPasswordMessage = document.getElementById('forgot-password-message');
	}

    async initialize() {
        this.loginForm.addEventListener('submit', this._handleLogin.bind(this));
		this.forgotPasswordShowButton.addEventListener('click', this._handleShowForgotPassword.bind(this));
		this.forgotPasswordSendButton.addEventListener('click', this._handleSendForgotPassword.bind(this));
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

		localStorage.setItem('username', username);
		localStorage.setItem('email', response.email);
		window.dispatchEvent(new Event('userLogged'));

		this.loginForm.reset();

		this._displaySuccessMessage();

		window.location.reload();
    }

	async _handleShowForgotPassword() {
		if (this.showForgotPassword) {
			this.loginForm.style.display = 'none';
			this.forgotPasswordContainer.classList.remove('hidden');
			this.showForgotPassword = false;
		} else {
			this.loginForm.style.display = '';
			this.forgotPasswordContainer.classList.add('hidden');
			this.showForgotPassword = true;
		}
	}

	async _handleSendForgotPassword() {
		const email = this.forgotPasswordInput.value.trim();
		const response = await this.loginService.postForgotPassword(email);
		if (response instanceof Error) {
			this._displayErrorMessage([response.message]);
			return;
		}

		this._clearErrorMessage();
		this.forgotPasswordMessage.innerHTML = 'An email has been sent to your email address. Please check your inbox.';
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
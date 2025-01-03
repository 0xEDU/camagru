
export default class RegisterComponent {
	constructor(registerService) {
		this.registerService = registerService;

		this.registerForm = document.getElementById('login-form');
		this.formMessage = document.getElementById('form-message');
	}

    async initialize() {
        this.registerForm.addEventListener('submit', this._handleLogin.bind(this));
    }

    destroy() {
        this.registerForm.removeEventListener('submit', this._handleLogin.bind(this));
    }

    _handleLogin(event) {
        event.preventDefault();
    }
}
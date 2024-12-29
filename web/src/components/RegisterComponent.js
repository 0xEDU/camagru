export default class RegisterComponent {
	constructor(registerService) {
		this.registerService = registerService;

		this.registerForm = document.getElementById('register-form');
	}

	async initialize() {
		this.registerForm.addEventListener('submit', this._handleRegister.bind(this));
	}

	destroy() {
		this.registerForm.removeEventListener('submit', this._handleRegister.bind(this));
	}

	_handleRegister(event) {
		event.preventDefault();
		
		const email = document.getElementById('email').value;
		const user = document.getElementById('user').value;
		const password = document.getElementById('password').value;
		const userData = {
			"email": email,
			"user": user,
			"password": password
		}
		this.registerService.postRegister(userData)

		this.registerForm.reset();
	}
}
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
		
		const formData = new FormData(event.target);
		const json = Object.fromEntries(formData.entries());
		console.log(JSON.stringify(json));

		this.registerForm.reset();
	}
}
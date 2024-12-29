export default class RegisterComponent {
	constructor(registerService) {
		this.registerService = registerService;

		this.registerForm = document.getElementById('register-form');
		this.errorMessage = document.getElementById('error-message');
	}

	async initialize() {
		this.registerForm.addEventListener('submit', this._handleRegister.bind(this));
	}

	destroy() {
		this.registerForm.removeEventListener('submit', this._handleRegister.bind(this));
	}

	_handleRegister(event) {
		event.preventDefault();

		// Clear previous error messages
		this._clearErrorMessage();

		// Get input values
		const email = document.getElementById('email').value.trim();
		const name = document.getElementById('name').value.trim();
		const password = document.getElementById('password').value;

		// Regular expressions for validation
		const nameRegex = /^[a-zA-Z0-9]+$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const passwordRegex = /^(?=.*[!@#$%^&*()-+=~])(?=.*\d)[\w!@#$%^&*()-+=~]{6,}$/; // At least 6 chars, 1 special char, 1 number

		// Validation flags
		let valid = true;
		let errors = [];

		// Validate name
		if (!nameRegex.test(name)) {
			valid = false;
			errors.push("Name must contain only letters and numbers.");
		}

		// Validate email
		if (!emailRegex.test(email)) {
			valid = false;
			errors.push("Invalid email format.");
		}

		// Validate password
		if (!passwordRegex.test(password)) {
			valid = false;
			errors.push("Password must be at least 6 characters, include at least 1 special character, and 1 number.");
		}

		// If invalid, show error messages and stop
		if (!valid) {
			this._displayErrorMessage(errors);
			return;
		}

		// Data to send
		const userData = {
			email,
			name,
			password
		};

		// Send data to the register service
		this.registerService.postRegister(userData);

		// Reset the form after successful validation
		this.registerForm.reset();
	}

	_displayErrorMessage(errors) {
		this.errorMessage.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
		this.errorMessage.style.color = 'red';
	}

	_clearErrorMessage() {
		this.errorMessage.innerHTML = '';
	}
}
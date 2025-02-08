export default class RegisterComponent {
	constructor(registerService) {
		this.registerService = registerService;

		this.registerForm = document.getElementById('register-form');
		this.formMessage = document.getElementById('form-message');
	}

	async initialize() {
		this.registerForm.addEventListener('submit', this._handleRegister.bind(this));
	}

	destroy() {
		this.registerForm.removeEventListener('submit', this._handleRegister.bind(this));
	}

	async _handleRegister(event) {
		event.preventDefault();
		this._clearErrorMessage();

		// Get input values
		const email = document.getElementById('email').value.trim();
		const username = document.getElementById('name').value.trim();
		const password = document.getElementById('password').value;

		// Regular expressions for validation
		const nameRegex = /^[a-zA-Z0-9]+$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const passwordRegex = /^(?=.*[!@#$%^&*()-+=~])(?=.*\d)[\w!@#$%^&*()-+=~]{6,}$/; // At least 6 chars, 1 special char, 1 number

		let valid = true;
		let errors = [];

		// Validate name
		if (!nameRegex.test(username)) {
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

		if (!valid) {
			this._displayErrorMessage(errors);
			return;
		}

		// Data to send
		const userData = {
			email,
			username,
			password
		};

		const response = await this.registerService.postRegister(userData);
		if (response instanceof Error) {
			this._displayErrorMessage([response.message]);
			return;
		}

		// Reset the form after successful validation
		this.registerForm.reset();

		this._displaySuccessMessage();
		setTimeout(() => {
			window.location.reload();
		}, 2500);
			
	}

	_displaySuccessMessage() {
		this.formMessage.innerHTML = 'Registered successfully, check your email!';
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
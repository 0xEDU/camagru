export default class SettingsComponent {
    constructor(settingsService) {
        this.settingsService = settingsService;

		this.logoutButton = document.getElementById('logout-button');
        this.updateUsernameButton = document.getElementById('update-username-button');
        this.updateEmailButton = document.getElementById('update-email-button');
        this.updatePasswordButton = document.getElementById('update-password-button');

        this.updateUsernameInput = document.getElementById('update-username-input');
        this.updateEmailInput = document.getElementById('update-email-input');
        this.updatePasswordInput = document.getElementById('update-password-input');
        this.emailCheckbox = document.getElementById('email-checkbox');
    }

    async initialize() {
        const username = localStorage.getItem('username');
        this.updateUsernameInput.value = username;
        this.updateEmailInput.value = localStorage.getItem('email');
        const response = await this.settingsService.getEmailNotifications(username);
        this.emailCheckbox.checked = response.receive_email;

        this.emailCheckbox.addEventListener('change', this._handleEmailCheckboxChange.bind(this));
        this.updateUsernameButton.addEventListener('click', this._handleUpdateUsername.bind(this));
        this.updateEmailButton.addEventListener('click', this._handleUpdateEmail.bind(this));
        this.updatePasswordButton.addEventListener('click', this._handleUpdatePassword.bind(this));
    }

    destroy() {
    }

    _handleEmailCheckboxChange = async () => {
        const username = localStorage.getItem('username');
        await this.settingsService.updateEmailNotifications(username, this.emailCheckbox.checked);
    }

    async _handleUpdateUsername() {
        const username = localStorage.getItem('username');
        const response = await this.settingsService.updateUsername(username, this.updateUsernameInput.value);
        if (response.message) {
            localStorage.setItem('username', this.updateUsernameInput.value);
            window.location.reload();
        }
    }

    async _handleUpdateEmail() {
        const username = localStorage.getItem('username');
        const response = await this.settingsService.updateEmail(username, this.updateEmailInput.value);
        if (response.message) {
            localStorage.setItem('email', this.updateEmailInput.value);
            window.location.reload();
        }
    }

    async _handleUpdatePassword() {
        const username = localStorage.getItem('username');
        const response = await this.settingsService.updatePassword(username, this.updatePasswordInput.value);
        if (response.message) {
            window.location.reload();
        }
    }
}
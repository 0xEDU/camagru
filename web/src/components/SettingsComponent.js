export default class SettingsComponent {
    constructor(settingsService) {
        this.settingsService = settingsService;

		this.logoutButton = document.getElementById('logout-button');
        this.updateUsernameButton = document.getElementById('update-username-button');

        this.updateUsernameInput = document.getElementById('update-username-input');
        this.updateEmailInput = document.getElementById('update-email-input');
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
}
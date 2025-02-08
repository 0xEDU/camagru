export default class SettingsComponent {
    constructor(settingsService) {
        this.settingsService = settingsService;
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

        this.emailCheckbox.addEventListener('change', this._handleEmailCheckboxChange);
    }

    destroy() {
    }

    _handleEmailCheckboxChange = async () => {
        const username = localStorage.getItem('username');
        await this.settingsService.updateEmailNotifications(username, this.emailCheckbox.checked);
    }
}
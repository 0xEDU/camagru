export default class SettingsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getEmailNotifications(username) {
        return await this.httpClient.get(`/settings/${username}/receive-emails`);
    }

    async updateEmailNotifications(username, receiveEmail) {
        return await this.httpClient.put(`/settings/${username}/receive-emails`, { 'receive_email': receiveEmail.toString() });
    }

    async updateUsername(username, newUsername) {
        return await this.httpClient.put(`/settings/${username}/update-username`, { 'new_username': newUsername });
    }

    async updateEmail(username, newEmail) {
        return await this.httpClient.put(`/settings/${username}/update-email`, { 'new_email': newEmail });
    }
}
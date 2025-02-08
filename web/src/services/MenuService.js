export default class MenuService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async handleLogout() {
        return await this.httpClient.post('/logout');
    }
}
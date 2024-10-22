import HomeView  from "../views/HomeView.js";

class HomeViewModel {
	constructor(httpClient) {
        this.httpClient = httpClient;
		this.homeView = new HomeView();
	}

	async initialize() {
		await this.homeView.bindInitialize(this.loadData.bind(this))
	}

	async loadData() {
		const homeHtml = await this.httpClient.get('/home');
		return homeHtml['data'];

	}
}

export default HomeViewModel;
import insertElement from '../../libs/tinyDOM/insertElement.js'

class HomeView {
	constructor() {
		this.mainSection = document.getElementById('main-section');
	}

	async bindInitialize(handler) {
		const innerHtml = await handler();
		insertElement(this.mainSection.id, innerHtml);
	}

}

export default HomeView;
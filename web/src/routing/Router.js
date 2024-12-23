import emptyElement from '../libs/tinyDOM/emptyElement'
import insertElement from '../libs/tinyDOM/insertElement';

export class Router {
    _mainSection = document.getElementById('main-section');

    routes = [];

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    registerRoutes(routes) {
        this.routes = routes;
    }

    async navigateTo(path) {
        const route = this.routes.find(r => r === path);
        if (route) {
            const routeData = await this.httpClient.get(route);
            const innerHtml = routeData['data'];
            emptyElement(this._mainSection.id);
            insertElement(this._mainSection.id, innerHtml);
        }
    }
}
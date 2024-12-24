import emptyElement from '../libs/tinyDOM/emptyElement'
import insertElement from '../libs/tinyDOM/insertElement';
import routes from '../config/routes';

export class Router {
    _mainSection = document.getElementById('main-section');
    _routes = routes;
    _currentRoute = null;

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async navigateTo(path) {
        const route = this._routes.find(r => r.path === path);
        if (!route || route.path === this._currentRoute?.path) {
            return;
        }
        if (this._currentRoute) {
            await this._currentRoute.destroy();
        }
        this._currentRoute = route;
        const routeData = await this.httpClient.get(route.path);
        const innerHtml = routeData['data'];
        emptyElement(this._mainSection.id);
        insertElement(this._mainSection.id, innerHtml);
        this._currentRoute.initialize(this.httpClient);
    }
}
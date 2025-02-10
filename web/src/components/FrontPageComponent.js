export default class FrontPageComponent {
    constructor(frontPageService, router) {
        this.frontPageService = frontPageService;
        this.loggedInTag = document.getElementById('logged-in');
        this.router = router;
    }

    async initialize() {
        if (this.loggedInTag) {
            document.dispatchEvent(new Event('userLogged'));
        }
    }

    destroy() {
    }
}
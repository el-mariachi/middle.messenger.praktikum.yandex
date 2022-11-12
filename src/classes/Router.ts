import { Block } from './Block';
import Route from './Route';

export class Router {
  protected static _instance: Router;
  public routes: Route[] = [];
  public history = window.history;
  protected _currentRoute?: Route;
  constructor(protected _rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }
    Router._instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.addEventListener(
      'popstate',
      ((event: PopStateEvent) => {
        const pathname = event.currentTarget instanceof Window ? event.currentTarget.location.pathname : undefined;
        if (pathname) {
          this._onRoute(pathname);
        }
        this._onRoute(window.location.pathname);
      }).bind(this)
    );
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute) {
      // this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }
  go(pathname: string) {
    this.history.pushState({ page: pathname }, '', pathname);
    this._onRoute(pathname);
  }
  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

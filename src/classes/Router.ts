import Page from '../components/Page';
import Route, { Constructable } from './Route';
import Page404 from '../../src/pages/404';
import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export class Router {
  protected static _instance: Router;
  public routes: Route[] = [];
  static _route404: Route;
  public history = window.history;
  protected _currentRoute?: Route;
  constructor(protected _rootQuery: string = '#app') {
    if (Router._instance) {
      return Router._instance;
    }
    Router._instance = this;
    Router._route404 = new Route('', Page404, { rootQuery: this._rootQuery });
  }

  use(pathname: string, block: Constructable<Page>) {
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
      }).bind(this)
    );
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = Router._route404;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }
  go(pathname: string) {
    this.history.pushState({ page: pathname }, '', pathname);
    this._onRoute(pathname);
    appBus.emit(EVENTS.SWITCH_ROUTE, pathname);
  }
  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

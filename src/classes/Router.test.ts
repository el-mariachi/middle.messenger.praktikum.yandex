import { Router } from './Router';
import RouteOriginal from './Route';
import Page from '../components/Page';
import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();
appBus.on(EVENTS.SWITCH_ROUTE, receiveEvent);
let routeReceived = '';
function receiveEvent(eventData: string) {
  routeReceived = eventData;
}
const originalPushState = window.history.pushState;

jest.mock('./Route');
const Route = <jest.Mock<RouteOriginal>>RouteOriginal;

function createRouter(options: string) {
  return new Router(options);
}
function resetRouter() {
  const router = createRouter('body');
  router.routes = [];
}
beforeEach(() => {
  Route.mockClear();
  resetRouter();
});

afterEach(() => {
  window.history.pushState = originalPushState;
});

describe('The router class', () => {
  test('should return a single instance', () => {
    const r1 = createRouter('body');
    const r2 = createRouter('body');
    expect(r1).toBe(r2);
  });
  test('should create a new Route instance after use() call', () => {
    const router = createRouter('body');
    router.use('/login', Page);
    expect(Route).toHaveBeenCalledTimes(1);
    expect(Route).toHaveBeenCalledWith('/login', Page, { rootQuery: 'body' });
  });
  test('should add the new Route to the routes array', () => {
    const router = createRouter('body');
    const existingRoutes = router.routes.length;
    router.use('/settings', Page);
    expect(router.routes).toHaveLength(existingRoutes + 1);
    expect(router.routes[existingRoutes]).toBeInstanceOf(Route);
  });
  test('should change own history state after go()', () => {
    const router = createRouter('body');
    router.use('/settings', Page).start();
    router.go('/settings');
    expect(router.history.state).toEqual({ page: '/settings' });
  });
  test('should call window.history.pushState with route params', () => {
    const router = createRouter('body');
    window.history.pushState = jest.fn();
    router.use('/settings', Page).start();
    router.go('/settings');
    expect(window.history.pushState).toHaveBeenCalledWith({ page: '/settings' }, '', '/settings');
  });
  test('should update history with each navigation action', () => {
    const router = createRouter('body');
    router.use('/login', Page).use('/settings', Page).start();
    const oldHistoryLength = router.history.length;
    router.go('/login');
    router.go('/settings');
    expect(router.history.length).toBe(oldHistoryLength + 2);
  });
  test('should process user navigation in the browser', () => {
    const router = createRouter('body');
    router.use('/login', Page).use('/settings', Page).start();
    const oldHistoryLength = router.history.length;
    window.history.pushState({ page: 'login' }, 'Login', '/login');
    expect(router.history.length).toBe(oldHistoryLength + 1);
    expect(router.history.state).toEqual({ page: 'login' });
  });
  test('should emit SWITH_ROUTE event passing route name', () => {
    const router = createRouter('body');
    router.use('/login', Page).use('/settings', Page).start();
    router.go('/login');
    expect(routeReceived).toBe('/login');
  });
});

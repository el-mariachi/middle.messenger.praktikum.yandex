import { getUser } from './actions';
import { Router } from '../classes/Router';

const appRouter = new Router();

export function checkUserState(route: string) {
  const user = getUser();
  if (user !== null) {
    appRouter.go(route);
  }
}

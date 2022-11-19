import { getUserState } from './actions';
import { Router } from '../classes/Router';

const appRouter = new Router();

export function checkUserState(route: string) {
  const user = getUserState();
  if (user.id) {
    appRouter.go(route);
  }
}

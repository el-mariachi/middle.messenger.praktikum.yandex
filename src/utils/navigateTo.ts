import { Router } from '../classes/Router';

const appRouter = new Router('#app');
export function navigateTo(url: string) {
  appRouter.go(url);
  // window.location.href = url;
}

import { Router } from '../classes/Router';
import { UserController } from '../controllers/UserController';

const appRouter = new Router();
const userController = new UserController();

export async function loadUser(path: string) {
  const result = await userController.loadUser();
  if (result) {
    appRouter.go(path);
  }
}

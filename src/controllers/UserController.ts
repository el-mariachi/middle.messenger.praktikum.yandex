import { SignUpAPI } from '../api/SignUpAPI';
import { setUser } from '../store/actions';
import { Router } from '../classes/Router';

const signUpApi = new SignUpAPI();
const appRouter = new Router();

export class UserController {
  static _userController: UserController;
  constructor() {
    if (UserController._userController) {
      return UserController._userController;
    }
    UserController._userController = this;
  }
  public async loadUser() {
    try {
      const { status, response } = await signUpApi.userInfo();
      switch (status - (status % 100)) {
        case 200:
          setUser(response);
          appRouter.go('/chat_list');
          break;
        case 400:
          // TODO figure out if we need to show this
          if (status === 401) {
            console.log('unauthorized get user');
          }
          appRouter.go('/404');
          break;
        case 500:
          appRouter.go('/500');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Unble to load user.', error);
    }
  }
}

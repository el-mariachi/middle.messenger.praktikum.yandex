import { SignUpAPI } from '../api/SignUpAPI';
import { setUser } from '../store/actions';

const signUpApi = new SignUpAPI();

export class UserController {
  static _userController: UserController;
  constructor() {
    if (UserController._userController) {
      return UserController._userController;
    }
    UserController._userController = this;
  }
  public async loadUser(): Promise<boolean> {
    try {
      const { status, response } = await signUpApi.userInfo();
      switch (status - (status % 100)) {
        case 200:
          setUser(response);
          return true;
        case 400:
          if (status === 401) {
            // TODO remove
            console.log('unauthorized get user');
          }
          return false;
        case 500:
        default:
          return false;
      }
    } catch (error) {
      // TODO show 500 with error
      console.error('Unble to load user.', error);
      return false;
    }
  }
}

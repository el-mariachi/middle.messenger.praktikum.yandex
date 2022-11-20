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
        default:
          return false;
      }
    } catch (error) {
      return false;
    }
  }
}

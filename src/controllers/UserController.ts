import { SignUpAPI } from '../api/SignUpAPI';
import { UsersAPI } from '../api/UsersAPI';
import { setUser, setUserList } from '../store/actions';
import { userStruct } from '../store/Store';

const signUpApi = new SignUpAPI();
const usersApi = new UsersAPI();
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
          setUser(userStruct);
          return false;
        default:
          setUser(userStruct);
          return false;
      }
    } catch (error) {
      return false;
    }
  }
  public async search(searchString: string) {
    try {
      const { status, response } = await usersApi.search(searchString);
      switch (status - (status % 100)) {
        case 200:
          setUserList(response);
          break;
        default:
          setUserList([Object.assign(userStruct, { login: 'Нет подходящих пользователей' })]);
          break;
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log('UserController catch', error);
    }
  }
}

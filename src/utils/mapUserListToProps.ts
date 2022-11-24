import { State } from '../store/Store';
import { Indexed } from './merge';

export default function mapUserListToProps(state: State): Indexed {
  const { userList } = state;
  const users = Array.from(userList);

  return { userList: { users } };
}

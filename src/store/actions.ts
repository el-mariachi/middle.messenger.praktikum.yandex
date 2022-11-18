import store, { UserData } from './Store';

// const getUserState = () => {
//   const state = store.getState();
//   const user = state.user ?? {};
//   return Object.assign(
//     {
//       id: 0,
//       first_name: '',
//       second_name: '',
//       display_name: '',
//       login: '',
//       email: '',
//       phone: '',
//       avatar: '',
//     },
//     user
//   );
// };
const getUser = () => {
  const { user } = store.getState();
  return user;
};

const setUser = (userData: UserData | null) => {
  store.set('user', userData);
};

export { setUser, getUser };

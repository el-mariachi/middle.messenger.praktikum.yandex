import store from './Store';

type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

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

const setUser = (userData: UserData) => {
  store.set('user', userData);
};

export { setUser };

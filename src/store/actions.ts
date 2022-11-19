import store, { UserData, userStruct } from './Store';

const getUserState = () => {
  const state = store.getState();
  const user = state.user ?? {};
  return Object.assign(userStruct, user);
};

// const getUser = () => {
//   const { user } = store.getState();
//   return user;
// };

const setUser = (userData: UserData) => {
  store.set('user', userData);
};

export { setUser, getUserState };

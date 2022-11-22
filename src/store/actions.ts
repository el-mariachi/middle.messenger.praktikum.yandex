import store, { UserData, userStruct, ChatData } from './Store';

const getUserState = () => {
  const state = store.getState();
  const user = state.user ?? {};
  return Object.assign(userStruct, user);
};

const setUser = (userData: UserData) => {
  store.set('user', userData);
};

const setChats = (chatsData: ChatData[]) => {
  store.set('chats', chatsData);
};

export { setUser, getUserState, setChats };

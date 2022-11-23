import store, { UserData, userStruct, ChatData, chatStruct } from './Store';

const getUserState = () => {
  const state = store.getState();
  const user = state.user ?? {};
  return Object.assign(userStruct, user);
};
const getCurrentChat = () => {
  const { currentChat, chatsData } = store.getState();
  const currentChatData = chatsData.find(({ id }) => id === currentChat);
  return currentChatData ?? chatStruct;
};

const setUser = (userData: UserData) => {
  store.set('user', userData);
};

const setChats = (chatsData: ChatData[]) => {
  store.set('chatsData', chatsData);
};
const setCurrentChat = (id: number) => {
  store.set('currentChat', id);
};

export { setUser, getCurrentChat, setCurrentChat, setChats };

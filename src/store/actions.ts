import store, { UserData, userStruct, ChatData, chatStruct, MessageData } from './Store';

const getUserState = () => {
  const state = store.getState();
  const user = state.user ?? {};
  return Object.assign(userStruct, user);
};
const getChatId = () => {
  const { currentChat } = store.getState();
  return currentChat;
};
const getCurrentChat = () => {
  const { currentChat, chatsData } = store.getState();
  const currentChatData = chatsData.find(({ id }) => id === currentChat);
  return currentChatData ?? chatStruct;
};
const getMessages = () => {
  const { messagesData } = store.getState();
  return [...messagesData];
};

const setUser = (userData: UserData | null) => {
  store.set('user', userData ? userData : userStruct);
};
const setChats = (chatsData: ChatData[]) => {
  store.set('chatsData', chatsData);
};
const setCurrentChat = (id: number) => {
  store.set('currentChat', id);
};
const setUserList = (userList: UserData[]) => {
  store.set('userList', userList);
};
const setMessages = (messages: MessageData[]) => {
  if (messages.length === 0) {
    store.set('messagesData', []);
    return;
  }
  const storedMessages = getMessages();
  store.set('messagesData', [...storedMessages, ...messages.reverse()]);
};

export { setUser, getCurrentChat, setCurrentChat, setChats, getChatId, setUserList, getUserState, setMessages };

import { State, chatStruct } from '../store/Store';
import { Indexed } from './merge';

export default function mapCurrentChat(state: State): Indexed {
  const { currentChat, chatsData } = state;
  const currentChatData = chatsData.find(({ id }) => id === currentChat);
  return currentChatData ?? chatStruct;
}

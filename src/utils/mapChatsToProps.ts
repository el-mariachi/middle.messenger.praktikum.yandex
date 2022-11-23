import createChat from './createChat';
import { State } from '../store/Store';
import { Indexed } from './merge';

export default function mapChatsToProps(state: State): Indexed {
  const { chatsData } = state;
  const chats = chatsData.map(createChat);
  return { chats };
}

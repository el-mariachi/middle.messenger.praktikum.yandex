import createChat from './createChat';
import { State } from '../store/Store';
import { Indexed } from './merge';
import { ChatData } from '../store/Store';
import mapChatAvatar from './mapChatAvatar';

export default function mapChatsToProps(state: State): Indexed {
  const { currentChat, chatsData } = state;
  const chats = chatsData.map(addCurrentFlag).map(mapChatAvatar).map(createChat);
  return { chats };
  function addCurrentFlag(chatData: ChatData): ChatData & { current: boolean } {
    return { ...chatData, current: chatData.id === currentChat ? true : false };
  }
}

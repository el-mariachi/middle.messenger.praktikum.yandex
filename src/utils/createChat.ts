import Chat from '../components/Chat';
import { ChatData } from '../store/Store';

export default function createChat(chatData: ChatData) {
  const preview = chatData.last_message ? chatData.last_message.content : 'В этом чате пока нет сообщений';
  const sender = chatData.last_message ? chatData.last_message.user.display_name : '';
  const chat = new Chat({ ...chatData, preview, sender });
  chat.dispatchComponentDidMount();
  return chat;
}

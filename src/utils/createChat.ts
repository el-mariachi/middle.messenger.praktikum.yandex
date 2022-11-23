import Chat from '../components/Chat';
import { ChatData } from '../store/Store';
import defaultAvatar from '../../static/images/chuvak130.png';

export default function createChat(chatData: ChatData) {
  const preview = chatData.last_message ? chatData.last_message.content : 'В этом чате пока нет сообщений';
  const sender = chatData.last_message ? chatData.last_message.user.display_name : '';
  if (chatData.avatar === null) {
    chatData.avatar = defaultAvatar;
  }
  const chat = new Chat({ ...chatData, preview, sender });
  chat.dispatchComponentDidMount();
  return chat;
}

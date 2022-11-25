import { BASE_URL } from '../constants/api';
import { ChatData } from '../store/Store';
import defaultAvatar from '../../static/images/chuvak130.png';

export default function mapChatAvatar(chatData: ChatData): ChatData {
  if (chatData.avatar === null) {
    chatData.avatar = defaultAvatar;
  } else {
    chatData.avatar = `${BASE_URL}/resources${chatData.avatar}`;
  }
  return chatData;
}

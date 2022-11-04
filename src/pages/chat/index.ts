import './chat.scss';
import { ChatPage } from './chat';
import { renderDOM } from '~/src/utils/renderDOM';
import ChatList from '~/src/components/ChatList';
import MessageArea from '~/src/components/MessageArea';

const selectedChat = {
  title: 'Александр Новиков',
  lastSeen: 'Был(а) недавно',
  imageUrl: new URL('/static/images/chat_avatar.png', import.meta.url),
};

const chatList = new ChatList({});
const messageArea = new MessageArea({
  selectedChat,
});

const chatListPage = new ChatPage({ chatList, messageArea });

renderDOM('#app', chatListPage);

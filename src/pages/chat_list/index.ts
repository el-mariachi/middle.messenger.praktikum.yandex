import './chat_list.scss';
import { ChatListPage } from './chat_list';
import { renderDOM } from '~/src/utils/renderDOM';
import ChatList from '~/src/components/ChatList';
import MessageArea from '~/src/components/MessageArea';

const chatList = new ChatList({});
const messageArea = new MessageArea({});

const chatListPage = new ChatListPage({ chatList, messageArea });

renderDOM('#app', chatListPage);
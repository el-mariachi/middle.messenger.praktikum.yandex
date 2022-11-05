import './chat_list.scss';
import { ChatListPage } from './chat_list';
import { renderDOM } from '../../utils/renderDOM';
import ChatList from '../../components/ChatList';
import MessageArea from '../../components/MessageArea';

const chatList = new ChatList({});
const messageArea = new MessageArea({});

const chatListPage = new ChatListPage({ chatList, messageArea });

renderDOM('#app', chatListPage);

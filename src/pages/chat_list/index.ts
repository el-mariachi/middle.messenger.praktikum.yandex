import './chat_list.scss';
import './chat_list.scss';
import { ChatListPage } from './chat_list';
import { renderDOM } from '../../utils/renderDOM';
import ChatList from '../../components/ChatList';
import ChatArea from '../../components/ChatArea';

const chatList = new ChatList({});
const chatArea = new ChatArea({});

const chatListPage = new ChatListPage({ chatList, chatArea });

renderDOM('#app', chatListPage);

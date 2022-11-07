import './chat.scss';
import { ChatPage } from './chat';
import { renderDOM } from '../../utils/renderDOM';
import ChatList from '../../components/ChatList';
import MessageArea from '../../components/MessageArea';
import Search from '../../components/Search';
import ChatListHeader from '../../components/ChatListHeader';
import Chats from '../../components/Chats';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import { chats } from '../../mockData/chats';
import { messages } from '../../mockData/messages';

const appBus = new EventBusSingl();

const chatListFrame = new Chats({});

const chatSearch = new Search({});
const chatListHeader = new ChatListHeader({});

const chatList = new ChatList({ chatListHeader, chatSearch, chatListFrame });
const messageArea = new MessageArea({
  selectedChat: true,
});

const chatListPage = new ChatPage({ chatList, messageArea });

renderDOM('#app', chatListPage);

appBus.emit(EVENTS.CHATS_LOADED, chats);
appBus.emit(EVENTS.MESSAGES_LOADED, messages);

import './chat_list.scss';
import { ChatListPage } from './chat_list';
import { renderDOM } from '../../utils/renderDOM';
import ChatList from '../../components/ChatList';
import MessageArea from '../../components/MessageArea';
import Search from '../../components/Search';
import ChatListHeader from '../../components/ChatListHeader';
import Chats from '../../components/Chats';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import { chats } from '../../mockData/chats';

const appBus = new EventBusSingl();

const chatListFrame = new Chats({});
const chatSearch = new Search({});
const chatListHeader = new ChatListHeader({});

const chatList = new ChatList({ chatListHeader, chatSearch, chatListFrame });
const messageArea = new MessageArea({});

const chatListPage = new ChatListPage({ chatList, messageArea });

renderDOM('#app', chatListPage);

appBus.emit(EVENTS.CHATS_LOADED, chats);

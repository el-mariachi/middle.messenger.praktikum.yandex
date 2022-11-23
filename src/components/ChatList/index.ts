import './ChatList.scss';
import { ChatList } from './ChatList';
import Search from '../../components/Search';
import ChatListHeader from '../../components/ChatListHeader';
import Chats from '../../components/Chats';
import selectChat from '../../utils/selectChat';

const chatListFrame = new Chats({
  events: {
    click: selectChat,
  },
});
const chatSearch = new Search({});
const chatListHeader = new ChatListHeader({});

export default new ChatList({ chatListHeader, chatSearch, chatListFrame });

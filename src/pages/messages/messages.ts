import Page, { PageProps } from '../../components/Page';
import pageTemplate from './messages.hbs';
import MessageArea from '../../components/MessageArea';
import Chats from '../../components/Chats';
import Search from '../../components/Search';
import ChatListHeader from '../../components/ChatListHeader';
import selectChat from '../../utils/selectChat';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import { MODE_CHAT } from '../../constants/messages';
import ChatList from '../../components/ChatList';
import { MessagesController } from '../../controllers/MessagesController';

const messageArea = new MessageArea({});
const chatListFrame = new Chats({
  events: {
    click: selectChat,
  },
});
const chatSearch = new Search({});
const chatListHeader = new ChatListHeader({});
const chatList = new ChatList({ chatListHeader, chatSearch, chatListFrame });
const appBus = new EventBusSingl();
new MessagesController();
export class MessagesPage extends Page {
  constructor(props: PageProps) {
    const classList = MessagesPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, chatList, messageArea });
    appBus.on(EVENTS.SET_MODE_CHAT, this.setMode.bind(this));
  }
  setMode(mode: MODE_CHAT) {
    if (mode === MODE_CHAT.LIST) {
      this._element.classList.remove('Page_type_chat');
      this._element.classList.add('Page_type_chatlist');
    } else if (mode === MODE_CHAT.CHAT) {
      this._element.classList.remove('Page_type_chatlist');
      this._element.classList.add('Page_type_chat');
    }
  }
  render(): DocumentFragment {
    this.setPageTitle('Chats');
    return this.compile(pageTemplate, this.props);
  }
}

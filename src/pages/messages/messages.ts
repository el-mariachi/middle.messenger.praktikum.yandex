import Page, { PageProps } from '../../components/Page';
import pageTemplate from './messages.hbs';
import chatList from '../../components/ChatList';
import messageArea from '../../components/MessageArea';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import { MODE } from '../../constants/messages';

const appBus = new EventBusSingl();
export class MessagesPage extends Page {
  constructor(props: PageProps) {
    const classList = MessagesPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, chatList, messageArea });
    appBus.on(EVENTS.SET_MODE, this.setMode.bind(this));
  }
  setMode(mode: MODE) {
    if (mode === MODE.LIST) {
      this._element.classList.remove('Page_type_chat');
      this._element.classList.add('Page_type_chatlist');
    } else if (mode === MODE.CHAT) {
      this._element.classList.remove('Page_type_chatlist');
      this._element.classList.add('Page_type_chat');
    }
  }
  render(): DocumentFragment {
    this.setPageTitle('Chats');
    return this.compile(pageTemplate, this.props);
  }
}

import Page, { IProps } from '../../components/Page';
import pageTemplate from './chat_list.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import chatList from '../../components/ChatList';
import messageArea from '../../components/MessageArea';

const appBus = new EventBusSingl();

export class ChatListPage extends Page {
  constructor(props: IProps) {
    const classList = ChatListPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, chatList, messageArea });
  }
  componentDidMount(): void {
    this._element.addEventListener('click', (evt: Event) => {
      appBus.emit(EVENTS.PAGE_CLICK, evt);
    });
  }
  render(): DocumentFragment {
    const title = document.querySelector('title');
    if (title) {
      title.textContent = 'Messenger Chat List';
    }
    return this.compile(pageTemplate, this.props);
  }
}

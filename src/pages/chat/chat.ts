import Page, { IProps } from '../../components/Page';
import pageTemplate from './chat.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import chatList from '../../components/ChatList';
import messageArea from '../../components/MessageArea';

const appBus = new EventBusSingl();

export class ChatPage extends Page {
  constructor(props: IProps) {
    const classList = ChatPage.appendClassList(['Page', 'Page_type_chat'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, chatList, messageArea });
  }
  componentDidMount(): void {
    this._element.addEventListener('click', (evt: Event) => {
      appBus.emit(EVENTS.PAGE_CLICK, evt);
    });
  }
  render(): DocumentFragment {
    this.setPageTitle('Chat');
    return this.compile(pageTemplate, this.props);
  }
}

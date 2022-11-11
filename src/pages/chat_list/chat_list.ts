import Page, { IProps } from '../../components/Page';
import pageTemplate from './chat_list.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

const appBus = new EventBusSingl();

export class ChatListPage extends Page {
  constructor(props: IProps) {
    const classList = ChatListPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings });
  }
  componentDidMount(): void {
    this._element.addEventListener('click', (evt: Event) => {
      appBus.emit(EVENTS.PAGE_CLICK, evt);
    });
  }
  render(): DocumentFragment {
    return this.compile(pageTemplate, this.props);
  }
}

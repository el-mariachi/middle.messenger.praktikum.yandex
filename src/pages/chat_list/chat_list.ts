import './chat_list.scss';
import { Block, IProps } from '../../classes/Block';
import pageTemplate from './chat_list.hbs';
import { EventBusSingl } from '~/src/controllers/EventBusSingl';
import { EVENTS } from '~/src/constants/events';

const appBus = new EventBusSingl();

export class ChatListPage extends Block {
  constructor(props: IProps) {
    const classList = ChatListPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    super('div', { ...props, classList, settings });
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

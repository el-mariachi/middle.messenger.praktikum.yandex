import { Block, IProps } from '../../classes/Block';
import pageTemplate from './chat.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

const appBus = new EventBusSingl();

export class ChatPage extends Block {
  constructor(props: IProps) {
    const classList = ChatPage.appendClassList(['Page', 'Page_type_chat'], props);
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

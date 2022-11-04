import { Block, IProps } from '~/src/classes/Block';
import chatTemplate from './Chat.hbs';
import { EventBusSingl } from '~/src/controllers/EventBusSingl';
import { EVENTS } from '~/src/constants/events';

const appBus = new EventBusSingl();
export class Chat extends Block {
  constructor(props: IProps) {
    const classList = Chat.appendClassList(['Chat'], props);
    super('li', { ...props, classList });
  }
  componentDidMount(): void {
    appBus.on(EVENTS.CHAT_SELECT, this.check.bind(this));
  }
  check(evt: Event) {
    if (evt.composedPath().includes(this._element)) {
      this.select();
      appBus.emit(EVENTS.CHAT_SELECTED, this.props);
    } else {
      this.deselect();
    }
  }
  select() {
    this._element.classList.add('Chat_selected');
  }
  deselect() {
    this._element.classList.remove('Chat_selected');
  }
  render(): DocumentFragment {
    return this.compile(chatTemplate, this.props);
  }
}

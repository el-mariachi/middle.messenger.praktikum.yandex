import { Block, IProps } from '../../classes/Block';
import chatsTemplate from './Chats.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

const appBus = new EventBusSingl();

export class Chats extends Block {
  constructor(props: IProps) {
    const classList = Chats.appendClassList(['ChatList-Frame'], props);
    super('section', { ...props, classList });
  }
  componentDidMount(): void {
    this._element.addEventListener('click', (evt: Event) => {
      appBus.emit(EVENTS.CHAT_SELECT, evt);
    });
  }
  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

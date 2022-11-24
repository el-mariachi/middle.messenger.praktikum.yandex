import { Block, IProps } from '../../classes/Block';
import chatTemplate from './Chat.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import { ChatData } from '../../store/Store';

type ChatProps = IProps &
  ChatData & {
    preview: string;
    sender: string;
  };

const appBus = new EventBusSingl();
export class Chat extends Block {
  constructor(props: ChatProps) {
    const classList = Chat.appendClassList(['Chat'], props);
    const tagName = 'li';
    super({ ...props, tagName, classList });
  }
  componentDidMount(): void {
    appBus.on(EVENTS.CHAT_SELECT, this.check.bind(this));
  }
  check(evt: Event) {
    if (evt.composedPath().includes(this._element)) {
      const { id } = this.props as ChatProps;
      appBus.emit(EVENTS.CHAT_SELECTED, id);
    }
  }
  render(): DocumentFragment {
    const { current } = this.props;
    if (current) {
      this._element.classList.add('Chat_selected');
    } else {
      this._element.classList.remove('Chat_selected');
    }
    return this.compile(chatTemplate, this.props);
  }
}

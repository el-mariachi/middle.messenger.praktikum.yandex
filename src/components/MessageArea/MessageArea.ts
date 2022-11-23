import { Block, IProps } from '../../classes/Block';
import messageAreaTemplate from './MessageArea.hbs';
import MessageAreaHeader from '../MessageAreaHeader';
import Compose from '../Compose';
import Message from '../Message';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

const appBus = new EventBusSingl();

type MessageType = {
  timestamp: string;
  type: string;
  text: string;
  image?: {
    src: string;
    alt: string;
  };
  status: string;
};
function createPageResources() {
  const compose = new Compose({});
  const messageAreaHeader = new MessageAreaHeader({});
  const click = (evt: Event) => {
    appBus.emit(EVENTS.PAGE_CLICK, evt);
  };
  // TODO remove
  messageAreaHeader.setProps({
    title: 'Чат не выбран',
  });
  return { compose, messageAreaHeader, click };
}

export class MessageArea extends Block {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = MessageArea.appendClassList(['MessageArea'], props);
    const settings = { hasID: true };
    const { compose, messageAreaHeader, click } = createPageResources();
    super({ ...props, tagName, classList, settings, messageAreaHeader, compose, events: { click } });
  }
  componentDidMount(): void {
    appBus.on(EVENTS.MESSAGES_LOADED, this.updateMessages.bind(this));
    appBus.on(EVENTS.MESSAGES_UPDATED, this.updateMessages.bind(this));
    appBus.on(EVENTS.CHAT_SELECTED, this.showChat.bind(this));
  }
  updateMessages(messagesData: MessageType[]) {
    const messages = messagesData.map((message) => new Message(message));
    this.setProps({
      messages,
    });
    messages.forEach((message) => {
      message.dispatchComponentDidMount();
    });
  }
  // TODO for testing purposes. Remove!
  showChat() {
    this.setProps({
      selectedChat: true,
    });
  }
  render(): DocumentFragment {
    return this.compile(messageAreaTemplate, this.props);
  }
}

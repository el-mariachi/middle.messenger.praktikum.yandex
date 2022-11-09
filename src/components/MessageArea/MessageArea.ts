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
    src: any;
    alt: string;
  };
  status: string;
};

const compose = new Compose({});

const messageAreaHeader = new MessageAreaHeader({});

export class MessageArea extends Block {
  constructor(props: IProps) {
    const classList = MessageArea.appendClassList(['MessageArea'], props);
    const settings = { hasID: true };
    super('main', { ...props, classList, settings, messageAreaHeader, compose });
  }
  componentDidMount(): void {
    appBus.on(EVENTS.MESSAGES_LOADED, this.updateMessages.bind(this));
    appBus.on(EVENTS.MESSAGES_UPDATED, this.updateMessages.bind(this));
  }
  updateMessages(messagesData: MessageType[]) {
    const messages = messagesData.map((message) => new Message(message));
    this.setProps({
      messages,
    });
    this.dispatchComponentDidMount();
  }
  render(): DocumentFragment {
    return this.compile(messageAreaTemplate, this.props);
  }
}

// TODO remove
messageAreaHeader.setProps({
  title: 'Чат не выбран',
});

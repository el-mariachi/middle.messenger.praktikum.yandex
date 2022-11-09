import { Block, IProps } from '../../classes/Block';
import Chat from '../Chat';
import chatsTemplate from './Chats.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

type ChatData = {
  title: string;
  image?: any;
  status: {
    time: string;
    state?: string;
  };
  preview: string;
  unread?: number;
};

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
    appBus.on(EVENTS.CHATS_LOADED, this.updateChats.bind(this));
    appBus.on(EVENTS.CHATS_UPDATED, this.updateChats.bind(this));
  }
  updateChats(chatsData: ChatData[]) {
    const chats = chatsData.map((chat) => new Chat(chat));
    this.setProps({
      chats,
    });
    this.dispatchComponentDidMount();
  }
  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

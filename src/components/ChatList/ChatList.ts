import { Block, IProps } from '../../classes/Block';
import chatListTemplate from './ChatList.hbs';
import Modal from '../Modal';
import { ChatListController } from '../../controllers/ChatListController';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import { CreateChatController } from '../../controllers/CreateChatController';

const appBus = new EventBusSingl();

function createPageResources(currentPath: string) {
  const pageModal = new Modal({});
  new ChatListController(currentPath, pageModal);
  new CreateChatController(currentPath, pageModal);
  const click = (evt: Event) => {
    appBus.emit(EVENTS.PAGE_CLICK, evt);
  };
  return { pageModal, click };
}

export class ChatList extends Block {
  constructor(props: IProps) {
    const tagName = 'aside';
    const classList = ChatList.appendClassList(['ChatList'], props);
    const settings = { hasID: true };
    const currentPath = props.currentPath as string;
    const { pageModal, click } = createPageResources(currentPath);
    super({ ...props, tagName, classList, settings, pageModal, events: { click } });
  }
  render(): DocumentFragment {
    return this.compile(chatListTemplate, this.props);
  }
}

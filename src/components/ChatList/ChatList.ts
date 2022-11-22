import { Block } from '../../classes/Block';
import { PageProps } from '../Page';
import chatListTemplate from './ChatList.hbs';
import Modal from '../Modal';
import { ChatListController } from '../../controllers/ChatListController';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

const appBus = new EventBusSingl();

function createPageResources(currentPath: string) {
  const pageModal = new Modal({});
  new ChatListController(currentPath, pageModal);
  const click = (evt: Event) => {
    appBus.emit(EVENTS.PAGE_CLICK, evt);
  };
  return { pageModal, click };
}

export class ChatList extends Block {
  constructor(props: PageProps) {
    const tagName = 'aside';
    const classList = ChatList.appendClassList(['ChatList'], props);
    const settings = { hasID: true };
    const { pageModal, click } = createPageResources(props.currentPath);
    super({ ...props, tagName, classList, settings, pageModal, events: { click } });
  }
  render(): DocumentFragment {
    return this.compile(chatListTemplate, this.props);
  }
}

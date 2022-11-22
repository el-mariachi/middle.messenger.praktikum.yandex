import Page, { PageProps } from '../../components/Page';
import pageTemplate from './chat_list.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import chatList from '../../components/ChatList';
import messageArea from '../../components/MessageArea';
import { ChatListController } from '../../controllers/ChatListController';
import Modal from '../../components/Modal';

const appBus = new EventBusSingl();

function createPageResources(currentPath: string) {
  const pageModal = new Modal({});
  new ChatListController(currentPath, pageModal);
  const click = (evt: Event) => {
    appBus.emit(EVENTS.PAGE_CLICK, evt);
  };
  return { pageModal, click };
}

export class ChatListPage extends Page {
  constructor(props: PageProps) {
    const classList = ChatListPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    const { pageModal, click } = createPageResources(props.currentPath);
    super({ ...props, classList, settings, chatList, messageArea, pageModal, events: { click } });
  }
  render(): DocumentFragment {
    this.setPageTitle('Chat List');
    return this.compile(pageTemplate, this.props);
  }
}

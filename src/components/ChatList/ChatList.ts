import { Block, IProps } from '../../classes/Block';
import chatListTemplate from './ChatList.hbs';
import { ChatListController } from '../../controllers/ChatListController';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import { CreateChatController } from '../../controllers/CreateChatController';

const appBus = new EventBusSingl();

function createPageResources(currentPath: string) {
  new ChatListController(currentPath);
  new CreateChatController(currentPath);
  const click = (evt: Event) => {
    appBus.emit(EVENTS.PAGE_CLICK, evt);
  };
  return { click };
}

export class ChatList extends Block {
  constructor(props: IProps) {
    const tagName = 'aside';
    const classList = ChatList.appendClassList(['ChatList'], props);
    const settings = { hasID: true };
    const currentPath = props.currentPath as string;
    const { click } = createPageResources(currentPath);
    super({ ...props, tagName, classList, settings, events: { click } });
  }
  render(): DocumentFragment {
    return this.compile(chatListTemplate, this.props);
  }
}

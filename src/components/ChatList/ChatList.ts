import { Block, IProps } from '../../classes/Block';
import chatListTemplate from './ChatList.hbs';
import Search from '../Search';
import ChatListHeader from '../ChatListHeader';

const chatSearch = new Search({});
const chatListHeader = new ChatListHeader({});
export class ChatList extends Block {
  constructor(props: IProps) {
    const classList = ChatList.appendClassList(['ChatList'], props);
    const settings = { hasID: true };
    super('aside', { ...props, classList, settings, chatListHeader, chatSearch });
  }
  render(): DocumentFragment {
    return this.compile(chatListTemplate, this.props);
  }
}

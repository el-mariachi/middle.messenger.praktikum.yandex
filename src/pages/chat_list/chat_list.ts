import Page, { PageProps } from '../../components/Page';
import pageTemplate from './chat_list.hbs';
import chatList from '../../components/ChatList';
import messageArea from '../../components/MessageArea';

export class ChatListPage extends Page {
  constructor(props: PageProps) {
    const classList = ChatListPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, chatList, messageArea });
  }
  render(): DocumentFragment {
    this.setPageTitle('Chat List');
    return this.compile(pageTemplate, this.props);
  }
}

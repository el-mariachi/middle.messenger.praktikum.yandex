import Page, { IProps } from '../../components/Page';
import pageTemplate from './chat.hbs';
import chatList from '../../components/ChatList';
import messageArea from '../../components/MessageArea';

export class ChatPage extends Page {
  constructor(props: IProps) {
    const classList = ChatPage.appendClassList(['Page', 'Page_type_chat'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, chatList, messageArea });
  }
  render(): DocumentFragment {
    this.setPageTitle('Chat');
    return this.compile(pageTemplate, this.props);
  }
}

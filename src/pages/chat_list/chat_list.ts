import './chat_list.scss';
import { Block, IProps } from '../../classes/Block';
import pageTemplate from './chat_list.hbs';

export class ChatListPage extends Block {
  constructor(props: IProps) {
    const classList = ChatListPage.appendClassList(['Page', 'Page_type_chatlist'], props);
    const settings = { hasID: true };
    super('div', { ...props, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(pageTemplate, this.props);
  }
}

import { Block, IProps } from '../../classes/Block';
import chatListTemplate from './ChatList.hbs';

export class ChatList extends Block {
  constructor(props: IProps) {
    const tagName = 'aside';
    const classList = ChatList.appendClassList(['ChatList'], props);
    const settings = { hasID: true };
    super({ ...props, tagName, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(chatListTemplate, this.props);
  }
}

import { Block, IProps } from '../../classes/Block';
import chatsTemplate from './Chats.hbs';

export class Chats extends Block {
  constructor(props: IProps) {
    const tagName = 'section';
    const classList = Chats.appendClassList(['ChatList-Frame'], props);
    super({ ...props, tagName, classList });
  }
  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

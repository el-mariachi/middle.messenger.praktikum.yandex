import { Block, IProps } from '../../classes/Block';
import chatAreaTemplate from './ChatArea.hbs';

export class ChatArea extends Block {
  constructor(props: IProps) {
    const classList = ChatArea.appendClassList(['ChatArea'], props);
    const settings = { hasID: true };
    super('main', { ...props, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(chatAreaTemplate, this.props);
  }
}

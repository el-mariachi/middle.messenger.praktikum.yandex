import { Block, IProps } from '../../classes/Block';
import chatAreaTemplate from './MessageArea.hbs';

export class MessageArea extends Block {
  constructor(props: IProps) {
    const classList = MessageArea.appendClassList(['MessageArea'], props);
    const settings = { hasID: true };
    super('main', { ...props, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(chatAreaTemplate, this.props);
  }
}

import { Block, IProps } from '../../classes/Block';
import messageTemplate from './Message.hbs';

type MessageProps = IProps & {
  type: string;
  image?: {
    src: string | URL;
    alt?: string;
  };
};

export class Message extends Block {
  constructor(props: MessageProps) {
    const { type } = props;
    const classList = Message.appendClassList(['Message', 'ChatArea-Message', type], props);
    const settings = { hasID: true };
    super('div', { ...props, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(messageTemplate, this.props);
  }
}

import { Block, IProps } from '../../classes/Block';
import messageTemplate from './Message.hbs';

export type MessageProps = IProps & {
  timestamp: string;
  direction: string;
  image?: {
    src: string | URL;
    alt?: string;
  };
};

export class Message extends Block {
  constructor(props: MessageProps) {
    const { direction } = props;
    const classList = Message.appendClassList(['Message', 'ChatArea-Message', direction], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(messageTemplate, this.props);
  }
}

import { Block, IProps } from '~/src/classes/Block';
import messageAreaTemplate from './MessageArea.hbs';
import MessageAreaHeader from '~/src/components/MessageAreaHeader';
import Compose from '~/src/components/Compose';

const compose = new Compose({});

const messageAreaHeader = new MessageAreaHeader({});

export class MessageArea extends Block {
  constructor(props: IProps) {
    const classList = MessageArea.appendClassList(['MessageArea'], props);
    const settings = { hasID: true };
    super('main', { ...props, classList, settings, messageAreaHeader, compose });
  }
  render(): DocumentFragment {
    return this.compile(messageAreaTemplate, this.props);
  }
}

// TODO remove
messageAreaHeader.setProps({
  title: 'Чат не выбран',
});

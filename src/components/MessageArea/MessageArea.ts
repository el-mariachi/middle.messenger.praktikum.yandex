import { Block, IProps } from '../../classes/Block';
import messageAreaTemplate from './MessageArea.hbs';
import MessageAreaHeader from '../MessageAreaHeader';
import Compose from '../Compose';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

const appBus = new EventBusSingl();

function createPageResources() {
  const compose = new Compose({});
  const messageAreaHeader = new MessageAreaHeader({});
  const click = (evt: Event) => {
    appBus.emit(EVENTS.PAGE_CLICK, evt);
  };
  return { compose, messageAreaHeader, click };
}

export class MessageArea extends Block {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = MessageArea.appendClassList(['MessageArea'], props);
    const settings = { hasID: true };
    const { compose, messageAreaHeader, click } = createPageResources();
    super({ ...props, tagName, classList, settings, messageAreaHeader, compose, events: { click } });
  }
  render(): DocumentFragment {
    setTimeout(() => {
      const container = this._element.querySelector('.MessageArea-Curent');
      if (container) {
        const offset = container.scrollHeight - container.clientHeight;
        container.scrollBy({ behavior: 'smooth', top: offset });
      }
    }, 500);

    return this.compile(messageAreaTemplate, this.props);
  }
}

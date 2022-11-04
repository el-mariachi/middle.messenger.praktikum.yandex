import { Block, IProps } from '~/src/classes/Block';
import messAreaTemplate from './MessageAreaHeader.hbs';
import Menu from '~/src/components/Menu';
import Button from '~/src/components/Button';
import { EventBusSingl } from '~/src/controllers/EventBusSingl';
import { EVENTS } from '~/src/constants/events';

const appBus = new EventBusSingl();

const addLink = new Button('button', {
  text: 'Добавить пользователя',
  classList: ['Menu-Link', 'Menu_linktype_add'],
});

const deleteLink = new Button('button', {
  text: 'Удалить пользователя',
  classList: ['Menu-Link', 'Menu_linktype_delete'],
});

const messageAreaMenuData: IProps = {
  classList: ['MessageArea-Menu'],
  menuItems: [addLink, deleteLink],
  bodyType: 'Menu_bodytype_chat',
};

const messageAreaMenu = new Menu(messageAreaMenuData);

export class MessageAreaHeader extends Block {
  constructor(props: IProps) {
    const classList = MessageAreaHeader.appendClassList(['MessageArea-Header'], props);
    super('div', { ...props, classList, messageAreaMenu });
  }
  componentDidMount(): void {
    appBus.on(EVENTS.CHAT_SELECTED, this.setHeader.bind(this));
  }
  setHeader(props: IProps) {
    const { title, image } = props;
    this.setProps({
      title,
      image,
    });
  }
  render(): DocumentFragment {
    return this.compile(messAreaTemplate, this.props);
  }
}

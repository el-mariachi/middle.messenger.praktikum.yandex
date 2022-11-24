import { Block, IProps } from '../../classes/Block';
import messAreaTemplate from './MessageAreaHeader.hbs';
import Menu from '../Menu';
import Button from '../Button';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import Link from '../Link';
import { MODE } from '../../constants/messages';

const appBus = new EventBusSingl();

const addLink = new Button({
  tagName: 'button',
  text: 'Добавить пользователя',
  classList: ['Menu-Link', 'Menu_linktype_add'],
  events: {
    click: () => {
      appBus.emit(EVENTS.USER_ADD_REQUEST);
    },
  },
});

const deleteLink = new Button({
  tagName: 'button',
  text: 'Удалить пользователя',
  classList: ['Menu-Link', 'Menu_linktype_delete'],
  events: {
    click: () => {
      appBus.emit(EVENTS.USER_DELETE_REQUEST);
    },
  },
});

const messageAreaMenuData: IProps = {
  menuName: 'Меню чата',
  classList: ['MessageArea-Menu'],
  menuItems: [addLink, deleteLink],
  bodyType: 'Menu_bodytype_chat',
};

const messageAreaMenu = new Menu(messageAreaMenuData);

const chatListLink = new Link({
  text: 'Назад',
  classList: ['PageLink', 'PageLink_to_list'],
  attributes: {
    href: '/messages',
  },
  events: {
    click: () => {
      appBus.emit(EVENTS.SET_MODE, MODE.LIST);
    },
  },
});

export class MessageAreaHeader extends Block {
  constructor(props: IProps) {
    const classList = MessageAreaHeader.appendClassList(['MessageArea-Header'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, messageAreaMenu, chatListLink });
  }
  render(): DocumentFragment {
    return this.compile(messAreaTemplate, this.props);
  }
}

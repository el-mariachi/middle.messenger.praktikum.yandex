import { Block, IProps } from '../../classes/Block';
import messAreaTemplate from './MessageAreaHeader.hbs';
import Menu from '../Menu';
import Button from '../Button';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import Link from '../Link';

const appBus = new EventBusSingl();

const addLink = new Button({
  tagName: 'button',
  text: 'Добавить пользователя',
  classList: ['Menu-Link', 'Menu_linktype_add'],
});

const deleteLink = new Button({
  tagName: 'button',
  text: 'Удалить пользователя',
  classList: ['Menu-Link', 'Menu_linktype_delete'],
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
    href: '/chat_list',
  },
});

export class MessageAreaHeader extends Block {
  constructor(props: IProps) {
    const classList = MessageAreaHeader.appendClassList(['MessageArea-Header'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings, messageAreaMenu, chatListLink });
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

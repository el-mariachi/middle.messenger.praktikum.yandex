import { Block, IProps } from '~/src/classes/Block';
import messAreaTemplate from './MessageAreaHeader.hbs';
import Menu from '~/src/components/Menu';
import Button from '~/src/components/Button';
import { EventBusSingl } from '~/src/controllers/EventBusSingl';
import { EVENTS } from '~/src/constants/events';
import Link from '~/src/components/Link';

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
  menuName: 'Меню чата',
  classList: ['MessageArea-Menu'],
  menuItems: [addLink, deleteLink],
  bodyType: 'Menu_bodytype_chat',
};

const messageAreaMenu = new Menu(messageAreaMenuData);

const chatListUrl = '/up_/up_/src/pages/chat_list/chat_list.html';

const chatListLink = new Link({
  text: 'Назад',
  classList: ['PageLink', 'PageLink_to_list'],
  attributes: {
    href: chatListUrl,
  },
});

export class MessageAreaHeader extends Block {
  constructor(props: IProps) {
    const classList = MessageAreaHeader.appendClassList(['MessageArea-Header'], props);
    const settings = { hasID: true };
    super('div', { ...props, classList, settings, messageAreaMenu, chatListLink });
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

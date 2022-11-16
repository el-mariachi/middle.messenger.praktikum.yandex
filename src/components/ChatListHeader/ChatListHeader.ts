import { Block, IProps } from '../../classes/Block';
import headerTemplate from './ChatListHeader.hbs';
import Menu from '../Menu';
import Button from '../Button';
import Link from '../Link';

const renameLink = new Button({
  tagName: 'button',
  text: 'Переименовать',
  classList: ['Menu-Link', 'Menu_linktype_edit'],
});

const deleteLink = new Button({
  tagName: 'button',
  text: 'Удалить',
  classList: ['Menu-Link', 'Menu_linktype_delete'],
});

const chatListMenuData: IProps = {
  menuName: 'Главное меню',
  classList: ['ChatListHeader-Menu'],
  menuItems: [renameLink, deleteLink],
  bodyType: 'Menu_bodytype_chatlist',
};

const chatListMenu = new Menu(chatListMenuData);

const newChatButtonData = {
  tagName: 'button',
  attributes: {
    type: 'button',
  },
  classList: ['NewChat', 'ChatListHeader-NewChat', 'Icon', 'Icon_type_newchat'],
};

const newChatButton = new Button(newChatButtonData);

const profileLink = new Link({
  text: 'Профиль',
  classList: ['PageLink', 'PageLink_to_profile'],
  attributes: {
    href: '/settings',
  },
});

export class ChatListHeader extends Block {
  constructor(props: IProps) {
    const classList = ChatListHeader.appendClassList(['ChatListHeader'], props);
    super({ ...props, classList, chatListMenu, newChatButton, profileLink });
  }
  render(): DocumentFragment {
    return this.compile(headerTemplate, this.props);
  }
}

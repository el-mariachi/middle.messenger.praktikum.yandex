import { Block, IProps } from '~/src/classes/Block';
import headerTemplate from './ChatListHeader.hbs';
import Menu from '~/src/components/Menu';
import Button from '~/src/components/Button';
import Link from '~/src/components/Link';

const renameLink = new Button('button', {
  text: 'Переименовать',
  classList: ['Menu-Link', 'Menu_linktype_edit'],
});

const deleteLink = new Button('button', {
  text: 'Удалить',
  classList: ['Menu-Link', 'Menu_linktype_delete'],
});

const chatListMenuData: IProps = {
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

const newChatButton = new Button(newChatButtonData.tagName, newChatButtonData);

const profileUrl = new URL('/src/pages/edit_profile/edit_profile.handlebars', import.meta.url);

const profileLink = new Link({
  text: 'Профиль',
  classList: ['PageLink', 'PageLink_to_profile'],
  attributes: {
    href: profileUrl,
  },
});

export class ChatListHeader extends Block {
  constructor(props: IProps) {
    const classList = ChatListHeader.appendClassList(['ChatListHeader'], props);
    super('div', { ...props, classList, chatListMenu, newChatButton, profileLink });
  }
  render(): DocumentFragment {
    return this.compile(headerTemplate, this.props);
  }
}

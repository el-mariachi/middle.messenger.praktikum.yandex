import { Block, IProps } from '../../classes/Block';
import headerTemplate from './ChatListHeader.hbs';
import { renameLinkData, deleteLinkData, newChatButtonData, profileLinkData } from '../../constants/chatListHeader';
import Menu from '../Menu';
import Button from '../Button';
import Link from '../Link';

function createComponentResources() {
  const renameLink = new Button(renameLinkData);
  const deleteLink = new Button(deleteLinkData);

  const chatListMenuData: IProps = {
    menuName: 'Главное меню',
    classList: ['ChatListHeader-Menu'],
    menuItems: [renameLink, deleteLink],
    bodyType: 'Menu_bodytype_chatlist',
  };

  const chatListMenu = new Menu(chatListMenuData);
  const newChatButton = new Button(newChatButtonData);
  const profileLink = new Link(profileLinkData);

  return { chatListMenu, newChatButton, profileLink };
}

export class ChatListHeader extends Block {
  constructor(props: IProps) {
    const classList = ChatListHeader.appendClassList(['ChatListHeader'], props);
    const { chatListMenu, newChatButton, profileLink } = createComponentResources();
    super({ ...props, classList, chatListMenu, newChatButton, profileLink });
  }
  render(): DocumentFragment {
    return this.compile(headerTemplate, this.props);
  }
}

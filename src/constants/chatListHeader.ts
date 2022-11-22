import { goToURL } from '../utils/goToURL';
import { requestCreateChat } from '../utils/requestCreateChat';
import { hideModal } from '../utils/hideModal';
import { v4 as uniqueID } from 'uuid';

const renameLinkData = {
  tagName: 'button',
  text: 'Переименовать',
  classList: ['Menu-Link', 'Menu_linktype_edit'],
};

const deleteLinkData = {
  tagName: 'button',
  text: 'Удалить',
  classList: ['Menu-Link', 'Menu_linktype_delete'],
};

const newChatButtonData = {
  tagName: 'button',
  attributes: {
    type: 'button',
  },
  classList: ['NewChat', 'ChatListHeader-NewChat', 'Icon', 'Icon_type_newchat'],
  events: {
    click: requestCreateChat,
  },
};

const profileLinkData = {
  text: 'Профиль',
  classList: ['PageLink', 'PageLink_to_profile'],
  attributes: {
    href: '/settings',
  },
  events: {
    click: (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target) {
        goToURL.call(target);
      }
    },
  },
};

const modalID = uniqueID();

export { renameLinkData, deleteLinkData, newChatButtonData, profileLinkData, modalID };

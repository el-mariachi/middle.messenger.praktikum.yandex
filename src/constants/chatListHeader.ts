import { goToURL } from '../utils/goToURL';
import { requestCreateChat } from '../utils/requestCreateChat';
import { hideModal } from '../utils/hideModal';

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

const createChatFormInputsData = [
  {
    name: 'title',
    id: 'title',
    label: 'Название чата',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Название чата',
    accept: '',
    value: '',
    test: /^.+$/,
  },
];

const createChatFormButtonsData = [
  {
    tagName: 'input',
    attributes: {
      type: 'submit',
      name: 'submit',
      value: 'Создать чат',
    },
    text: 'Создать чат',
    classList: ['Modal-Button', 'Modal_type_ok'],
    events: {
      click: hideModal,
    },
  },
  {
    attributes: {
      type: 'button',
    },
    text: 'Отменить!',
    classList: ['Modal-Button', 'Modal_type_cancel'],
    events: {
      click: hideModal,
    },
  },
];

const createChatValidatorOtions = {
  formName: 'create_chat',
};

const notificationModalButtonData = [
  {
    attributes: {
      type: 'button',
    },
    text: 'Принято!',
    classList: ['Modal-Button', 'Modal_type_ok'],
    events: {
      click: hideModal,
    },
  },
];

export {
  renameLinkData,
  deleteLinkData,
  newChatButtonData,
  profileLinkData,
  createChatFormInputsData,
  createChatFormButtonsData,
  createChatValidatorOtions,
  notificationModalButtonData,
};

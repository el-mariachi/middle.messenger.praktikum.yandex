import { Block, IProps } from '~/src/classes/Block';
import chatListTemplate from './ChatList.hbs';
import Search from '~/src/components/Search';
import ChatListHeader from '~/src/components/ChatListHeader';
import Chats from '~/src/components/Chats';
import Chat from '~/src/components/Chat';

const chats = [
  {
    title: 'Vasili Pupkin',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: '15:42',
    },
    preview: 'В чащах юга жил-был цитрус, да, но фальшивый экземпляр.',
    unread: 3,
  },
  {
    title: 'Колян',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: '5:22',
    },
    preview:
      'Fero quam si odi te sita endam rectust ibusdam la ipsandam et doluptas elit ipis aborit, cullupic tem voloreicit ad ullendanti corem int facculparum et eturitaquis dolorum aut vel ipit quo quid m',
  },
  {
    title: 'Александр Новиков',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: 'Ср.',
      state: 'Status_state_read',
    },
    sender: 'Вы',
    preview:
      'Ximus, sinctas rerferibus assimax imincitatis dolore cum solore vollabo riorupidel idi dit exceaqui doluptam renimporum harum dissit atioris seditio.',
  },
  {
    title: '+7 903 750-48-21',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: '12-Июн-2022',
    },
    preview:
      'Pudae que senihicaepro odis endae si volor acessitate sim fugit omnihicid et minci sam sinveliquae in eumqui aut omnis excerro blabor',
    unread: 0,
  },
  {
    title: 'Vasili Pupkin',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: '15:42',
    },
    preview: 'В чащах юга жил-был цитрус, да, но фальшивый экземпляр.',
    unread: 3,
  },
  {
    title: 'Колян',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: '5:22',
    },
    preview:
      'Fero quam si odi te sita endam rectust ibusdam la ipsandam et doluptas elit ipis aborit, cullupic tem voloreicit ad ullendanti corem int facculparum et eturitaquis dolorum aut vel ipit quo quid m',
  },
  {
    title: 'Александр Новиков',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: 'Ср.',
      state: 'Status_state_read',
    },
    sender: 'Вы',
    preview:
      'Ximus, sinctas rerferibus assimax imincitatis dolore cum solore vollabo riorupidel idi dit exceaqui doluptam renimporum harum dissit atioris seditio.',
  },
  {
    title: '+7 903 750-48-21',
    image: new URL('/static/images/chat_avatar.png', import.meta.url),
    status: {
      time: '12-Июн-2022',
    },
    preview:
      'Pudae que senihicaepro odis endae si volor acessitate sim fugit omnihicid et minci sam sinveliquae in eumqui aut omnis excerro blabor',
    unread: 0,
  },
].map((chatData) => new Chat(chatData));

const chatListFrame = new Chats({
  chats,
});

const chatSearch = new Search({});
const chatListHeader = new ChatListHeader({});
export class ChatList extends Block {
  constructor(props: IProps) {
    const classList = ChatList.appendClassList(['ChatList'], props);
    const settings = { hasID: true };
    super('aside', { ...props, classList, settings, chatListHeader, chatSearch, chatListFrame });
  }
  render(): DocumentFragment {
    return this.compile(chatListTemplate, this.props);
  }
}

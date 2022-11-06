import './chat_list.scss';
import { ChatListPage } from './chat_list';
import { renderDOM } from '../../utils/renderDOM';
import ChatList from '../../components/ChatList';
import MessageArea from '../../components/MessageArea';
import Search from '../../components/Search';
import ChatListHeader from '../../components/ChatListHeader';
import Chats from '../../components/Chats';
import Chat from '../../components/Chat';
import chatAvatar from '../../../static/images/chat_avatar.png';

const chats = [
  {
    title: 'Vasili Pupkin',
    image: chatAvatar,
    status: {
      time: '15:42',
    },
    preview: 'В чащах юга жил-был цитрус, да, но фальшивый экземпляр.',
    unread: 3,
  },
  {
    title: 'Колян',
    image: chatAvatar,
    status: {
      time: '5:22',
    },
    preview:
      'Fero quam si odi te sita endam rectust ibusdam la ipsandam et doluptas elit ipis aborit, cullupic tem voloreicit ad ullendanti corem int facculparum et eturitaquis dolorum aut vel ipit quo quid m',
  },
  {
    title: 'Александр Новиков',
    image: chatAvatar,
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
    image: chatAvatar,
    status: {
      time: '12-Июн-2022',
    },
    preview:
      'Pudae que senihicaepro odis endae si volor acessitate sim fugit omnihicid et minci sam sinveliquae in eumqui aut omnis excerro blabor',
    unread: 0,
  },
  {
    title: 'Vasili Pupkin',
    image: chatAvatar,
    status: {
      time: '15:42',
    },
    preview: 'В чащах юга жил-был цитрус, да, но фальшивый экземпляр.',
    unread: 3,
  },
  {
    title: 'Колян',
    image: chatAvatar,
    status: {
      time: '5:22',
    },
    preview:
      'Fero quam si odi te sita endam rectust ibusdam la ipsandam et doluptas elit ipis aborit, cullupic tem voloreicit ad ullendanti corem int facculparum et eturitaquis dolorum aut vel ipit quo quid m',
  },
  {
    title: 'Александр Новиков',
    image: chatAvatar,
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
    image: chatAvatar,
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

const chatList = new ChatList({ chatListHeader, chatSearch, chatListFrame });
const messageArea = new MessageArea({});

const chatListPage = new ChatListPage({ chatList, messageArea });

renderDOM('#app', chatListPage);

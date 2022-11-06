import './chat.scss';
import { ChatPage } from './chat';
import { renderDOM } from '../../utils/renderDOM';
import ChatList from '../../components/ChatList';
import MessageArea from '../../components/MessageArea';
import Message from '../../components/Message';
import pict from '../../../static/images/chat_pic.png';
import Search from '../../components/Search';
import ChatListHeader from '../../components/ChatListHeader';
import Chats from '../../components/Chats';
import Chat from '../../components/Chat';
import chatAvatar from '../../../static/images/chat_avatar.png';

/* --------------- chatlist --------------- */

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

/* -------------- messages ---------------- */

const messages = [
  {
    timestamp: Date.parse('2022-07-28T15:44:12.000+03:00'),
    type: 'Message_type_incoming',
    text: 'Gent. Incieni maioren derumen dicate pa solum apit eate poribus quossin ciaero omnima ne sit, cusandundae magnatis reicabo repudae qui aut fugit quae verunt ea suntiis citist vero et lamet at autecat emquia cus.',
    image: {
      src: pict,
      alt: 'Чуваки',
    },
  },
  {
    timestamp: Date.parse('2022-07-28T15:47:12.000+03:00'),
    type: 'Message_type_outgoing',
    text: `1. Подключён TypeScript.
    2. Добавлен компонентный подход.
    3. Проект структурирован.`,
    status: 'Status_state_read',
  },
  {
    timestamp: Date.parse('2022-07-28T15:47:12.000+03:00'),
    type: 'Message_type_outgoing',
    text: 'Обязательно валидировать формы на страницахавторизации, регистрации, настроек пользователя.Опционально: отправка сообщения.',
    status: 'Status_state_read',
  },
  {
    timestamp: Date.parse('2022-07-28T15:48:12.000+03:00'),
    type: 'Message_type_incoming',
    text: 'Gia acestibusam il invelest, tent maximin ctotat.',
  },
  {
    timestamp: Date.parse('2022-07-28T15:44:12.000+03:00'),
    type: 'Message_type_incoming',
    text: 'Gent. Incieni maioren derumen dicate pa solum apit eate poribus quossin ciaero omnima ne sit, cusandundae magnatis reicabo repudae qui aut fugit quae verunt ea suntiis citist vero et lamet at autecat emquia cus.',
    image: {
      src: pict,
      alt: 'Чуваки',
    },
  },
  {
    timestamp: Date.parse('2022-07-28T15:47:12.000+03:00'),
    type: 'Message_type_outgoing',
    text: 'Rlga asdofygls asyg',
    status: 'Status_state_read',
  },
  {
    timestamp: Date.parse('2022-07-28T15:48:12.000+03:00'),
    type: 'Message_type_incoming',
    text: 'Gia acestibusam il invelest, tent maximin ctotat.',
  },
]
  .map((message) => ({
    ...message,
    timestamp: `${new Date(message.timestamp).getHours()}:${new Date(message.timestamp).getMinutes()}`,
  }))
  .map((message) => new Message(message));

const chatList = new ChatList({ chatListHeader, chatSearch, chatListFrame });
const messageArea = new MessageArea({
  selectedChat: true,
  messages,
});

const chatListPage = new ChatPage({ chatList, messageArea });

renderDOM('#app', chatListPage);

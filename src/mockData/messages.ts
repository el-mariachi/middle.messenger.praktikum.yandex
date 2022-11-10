import pict from '../../static/images/chat_pic.png';

export const messages = [
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
].map((message) => ({
  ...message,
  timestamp: `${new Date(message.timestamp).getHours()}:${new Date(message.timestamp).getMinutes()}`,
}));

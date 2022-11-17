import { Router } from '../../src/classes/Router';
import Page404 from '../../src/pages/404';
import Page500 from '../../src/pages/500';
import Login from '../../src/pages/login';
import SignUp from '../../src/pages/sign_up';
import EditProfilePage from '../../src/pages/edit_profile';
import ChatListPage from '../../src/pages/chat_list';
import ChatPage from '../../src/pages/chat';
import { EventBusSingl } from '../../src/controllers/EventBusSingl';
import { EVENTS } from '../../src/constants/events';
import { chats } from '../../src/mockData/chats';
import { messages } from '../../src/mockData/messages';

const appBus = new EventBusSingl();

const appRouter = new Router('#app');

appRouter
  .use('/', Login)
  .use('/sign_up', SignUp)
  .use('/settings', EditProfilePage)
  .use('/chat_list', ChatListPage)
  .use('/chat', ChatPage)
  .use('/404', Page404)
  .use('/500', Page500)
  .start();

appBus.emit(EVENTS.CHATS_LOADED, chats);
appBus.emit(EVENTS.MESSAGES_LOADED, messages);

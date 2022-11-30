import { Router } from './classes/Router';
import Page500 from './pages/500';
import Login from './pages/login';
import SignUp from './pages/sign_up';
import EditProfilePage from './pages/edit_profile';
import MessagesPage from './pages/messages';
import Modal from './components/Modal';
import { renderDOM } from './utils/renderDOM';
import { ModalController } from './controllers/ModalController';

const appRouter = new Router('body');

appRouter
  .use('/', Login)
  .use('/sign_up', SignUp)
  .use('/settings', EditProfilePage)
  .use('/messages', MessagesPage)
  .use('/500', Page500)
  .start();

const appModal = new Modal({});
new ModalController(appModal);
renderDOM('body', appModal);

import { Router } from '../../src/classes/Router';
import Page500 from '../../src/pages/500';
import Login from '../../src/pages/login';
import SignUp from '../../src/pages/sign_up';
import EditProfilePage from '../../src/pages/edit_profile';
import MessagesPage from '../../src/pages/messages';
import Modal from '../../src/components/Modal';
import { renderDOM } from '../../src/utils/renderDOM';
import { ModalController } from '../../src/controllers/ModalController';

const appRouter = new Router('#app');

appRouter
  .use('/', Login)
  .use('/sign_up', SignUp)
  .use('/settings', EditProfilePage)
  .use('/messages', MessagesPage)
  .use('/500', Page500)
  .start();

const appModal = new Modal({});
new ModalController(appModal);
renderDOM('#app', appModal);

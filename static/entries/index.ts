import { Router } from '../../src/classes/Router';
import Page404 from '../../src/pages/404';
import Login from '../../src/pages/login';
import SignUp from '../../src/pages/sign_up';
import EditProfilePage from '../../src/pages/edit_profile';

const appRouter = new Router('#app');

appRouter.use('/', Login).use('/sign_up', SignUp).use('/settings', EditProfilePage).use('404', Page404).start();

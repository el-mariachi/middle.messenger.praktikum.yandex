import { Router } from '../../src/classes/Router';
import Login from '../../src/pages/login';
import SignUp from '../../src/pages/sign_up';

const appRouter = new Router('#app');

appRouter.use('/', Login).use('/sign_up', SignUp).start();

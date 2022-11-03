import './login.scss';
import { LoginPage } from './login';
import { renderDOM } from '../../utils/renderDOM';

const login = new LoginPage({});

renderDOM('#app', login);

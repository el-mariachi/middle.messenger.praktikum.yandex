import './login.scss';
import { Login } from './login';
import { renderDOM } from '../../utils/renderDOM';

const login = new Login({});

renderDOM('#app', login);

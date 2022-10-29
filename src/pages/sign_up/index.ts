import './sign_up.scss';
import { SignUp } from './sign_up';
import { renderDOM } from '../../utils/renderDOM';

const sign_up = new SignUp({});

renderDOM('#app', sign_up);

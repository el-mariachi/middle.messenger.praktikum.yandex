import './sign_up.scss';
import { SignUpPage } from './sign_up';
import { renderDOM } from '../../utils/renderDOM';

const sign_up = new SignUpPage({});

renderDOM('#app', sign_up);

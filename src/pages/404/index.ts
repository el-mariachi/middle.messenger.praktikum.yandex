import './404.scss';
import { Page404 } from './404';
import { renderDOM } from '../../utils/renderDOM';

const page404 = new Page404({});

renderDOM('#app', page404);

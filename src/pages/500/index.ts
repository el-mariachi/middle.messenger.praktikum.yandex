import './500.scss';
import { Page500 } from './500';
import { renderDOM } from '../../utils/renderDOM';

const page500 = new Page500({});

renderDOM('#app', page500);

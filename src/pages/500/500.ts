import './500.scss';
import { renderPage } from '../../utils/renderPage';

import ErrorPage from '../../components/ErrorPage/ErrorPage.hbs';

console.log(ErrorPage);

const pageData = {
  errorCode: 500,
  errorMessage: 'Ошибка сервера',
};

renderPage('#app', ErrorPage(pageData));
import './404.scss';
import { renderPage } from '../../utils/renderPage';

import ErrorPage from '../../components/ErrorPage/ErrorPage.hbs';

console.log(ErrorPage);

const pageData = {
  errorCode: 404,
  errorMessage: 'Страница не найдена',
};

renderPage('#app', ErrorPage(pageData));

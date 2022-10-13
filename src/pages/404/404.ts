import './404.scss';
import { compile } from 'handlebars';
import { renderPage } from '../../utils/renderPage';

import ErrorPage from 'bundle-text:../../components/ErrorPage/ErrorPage.hbs';
console.log(ErrorPage);

const pageData = {
  errorCode: 404,
  errorMessage: 'Страница не найдена',
};

const template = compile(ErrorPage);

renderPage('#app', template(pageData));

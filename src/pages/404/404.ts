import './404.scss';
import { compile } from "handlebars";
import { renderPage } from "../../utils/renderPage";

import {errorPage} from "../../components/ErrorPage/ErrorPage.tmpl";

const pageData = {
    errorCode: 404,
    errorMessage: 'Страница не найдена'
};

const template = compile(errorPage);

renderPage('#app', template(pageData));

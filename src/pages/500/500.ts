import './500.scss';
import { compile } from "handlebars";
import { renderPage } from "../../utils/renderPage";

import {errorPage} from "../../components/ErrorPage/ErrorPage.tmpl";

const pageData = {
    errorCode: 500,
    errorMessage: 'Ошибка сервера'
};

const template = compile(errorPage);

renderPage('#app', template(pageData));

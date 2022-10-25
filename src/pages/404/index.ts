import './404.scss';
import { Page404 } from './404';
import { renderDOM } from '../../utils/renderDOM';
import { IProps } from '../../classes/Block';

const pageData: IProps = {
  errorCode: 404,
  errorMessage: 'Страница не найдена',
  settings: {
    hasID: true,
  },
};

const page404 = new Page404(pageData);

renderDOM('#app', page404);

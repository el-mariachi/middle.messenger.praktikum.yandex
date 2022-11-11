import { Block, IProps } from '../../classes/Block';
import ErrorPageTemplate from '../../components/ErrorPage/ErrorPage.hbs';

export class Page404 extends Block {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = Page404.appendClassList(['Page', 'Page_type_not-found'], props);
    const pageData: IProps = {
      errorCode: 404,
      errorMessage: 'Страница не найдена',
      settings: {
        hasID: true,
      },
    };
    super({ ...props, tagName, classList, ...pageData });
  }

  render(): DocumentFragment {
    return this.compile(ErrorPageTemplate, this.props);
  }
}

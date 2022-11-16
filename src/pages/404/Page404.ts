import Page, { IProps } from '../../components/Page';
import ErrorPageTemplate from '../../components/ErrorPage/ErrorPage.hbs';

export class Page404 extends Page {
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
    const title = document.querySelector('title');
    if (title) {
      title.textContent = 'Messenger 404';
    }
    return this.compile(ErrorPageTemplate, this.props);
  }
}

import Page, { IProps } from '../../components/Page';
import ErrorPageTemplate from '../../components/ErrorPage/ErrorPage.hbs';

export class Page500 extends Page {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = Page500.appendClassList(['Page', 'Page_type_not-found'], props);
    const pageData: IProps = {
      errorCode: 500,
      errorMessage: 'Ошибка сервера',
      settings: {
        hasID: true,
      },
    };
    super({ ...props, tagName, classList, ...pageData });
  }

  render(): DocumentFragment {
    this.setPageTitle('500');
    return this.compile(ErrorPageTemplate, this.props);
  }
}

import { Block, IProps } from '../../classes/Block';
import ErrorPageTemplate from '../../components/ErrorPage/ErrorPage.hbs';

export class Page500 extends Block {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = ['Page', 'Page_type_not-found'];
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
    return this.compile(ErrorPageTemplate, this.props);
  }
}

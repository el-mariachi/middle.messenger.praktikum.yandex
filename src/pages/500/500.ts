import { Block, IProps } from '../../classes/Block';
import ErrorPageTemplate from '../../components/ErrorPage/ErrorPage.hbs';

export class Page500 extends Block {
  constructor(props: IProps) {
    const classList = ['Page', 'Page_type_not-found'];
    const pageData: IProps = {
      errorCode: 500,
      errorMessage: 'Ошибка сервера',
      settings: {
        hasID: true,
      },
    };
    super('main', { ...props, classList, ...pageData });
  }

  render(): DocumentFragment {
    return this.compile(ErrorPageTemplate, this.props);
  }
}

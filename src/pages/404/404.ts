import { Block, IProps } from '../../classes/Block';
import ErrorPageTemplate from '../../components/ErrorPage/ErrorPageInner.hbs';

export class Page404 extends Block {
  constructor(props: IProps) {
    const classList = ['Page', 'Page_type_not-found'];
    const pageData: IProps = {
      errorCode: 404,
      errorMessage: 'Страница не найдена',
      settings: {
        hasID: true,
      },
    };
    super('main', { ...props, classList, ...pageData });
  }

  render(): DocumentFragment {
    return this.insertChildren(ErrorPageTemplate, this.props);
  }
}

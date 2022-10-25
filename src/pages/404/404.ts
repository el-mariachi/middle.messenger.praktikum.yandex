import { Block, IProps } from '../../classes/Block';
import ErrorPageTemplate from '../../components/ErrorPage/ErrorPage.hbs';

export class Page404 extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.insertChildren(ErrorPageTemplate, this.props);
  }
}

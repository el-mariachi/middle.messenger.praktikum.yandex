import { Block, IProps } from '../../classes/Block';
import linkTemplate from './Link.hbs';

export class Link extends Block {
  constructor(props: IProps) {
    const tagName = 'a';
    const classList = Link.appendClassList(['Link'], props);
    const settings = { hasID: true };
    super({ ...props, tagName, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(linkTemplate, this.props);
  }
}

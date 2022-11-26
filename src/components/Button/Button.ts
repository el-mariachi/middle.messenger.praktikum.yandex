import { Block, IProps } from '../../classes/Block';
import buttonTemplate from './Button.hbs';

export class Button extends Block {
  constructor(props: IProps) {
    const tagName = props.tagName || 'button';
    super({ ...props, tagName });
  }
  render(): DocumentFragment {
    return this._element.nodeName === 'INPUT'
      ? document.createDocumentFragment()
      : this.compile(buttonTemplate, this.props);
  }
}

import { Block, IProps } from '../../classes/Block';
import buttonTemplate from './Button.hbs';

export class Button extends Block {
  constructor(tagName = 'button', props: IProps) {
    super(tagName, props);
  }
  render(): DocumentFragment {
    return this._element.nodeName === 'INPUT'
      ? document.createDocumentFragment()
      : this.compile(buttonTemplate, this.props);
  }
}

import { Block } from '../../classes/Block';
import { InputProps } from '../InputGroup';
export class Input extends Block {
  constructor(props: InputProps) {
    const classList = Input.appendClassList(['Input'], props);
    const settings = { hasID: true };
    super('input', { ...props, classList, settings });
  }
  // getContent(): HTMLInputElement {
  //   return this._element as HTMLInputElement;
  // }
  // public focus() {
  //   this.element.focus();
  // }
}

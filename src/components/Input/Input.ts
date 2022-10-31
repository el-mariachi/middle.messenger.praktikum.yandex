import { Block, IProps } from '../../classes/Block';

export class Input extends Block {
  constructor(props: IProps) {
    const classList = Input.appendClassList(['Input'], props);
    const settings = { hasID: true };
    super('input', { ...props, classList, settings });
  }
  getContent(): HTMLInputElement {
    return this._element as HTMLInputElement;
  }
  public focus() {
    this.element.focus();
  }
}

import { Block, IProps } from '../../classes/Block';
import modalTemplate from './Modal.hbs';

export class Modal extends Block {
  constructor(props: IProps) {
    const classList = Modal.appendClassList(['Modal'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings });
  }
  reset() {
    Object.keys(this.children).forEach((key) => {
      delete this.children[key];
    });
    Object.keys(this.props).forEach((key) => {
      delete this.props[key];
    });
  }
  show() {
    this.getContent().style.display = 'flex';
  }
  render(): DocumentFragment {
    if (this.props.error) {
      this._element.classList.add('Modal_type_error');
    } else {
      this._element.classList.remove('Modal_type_error');
    }
    return this.compile(modalTemplate, this.props);
  }
}

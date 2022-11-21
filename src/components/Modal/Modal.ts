import { Block, IProps } from '../../classes/Block';
import modalTemplate from './Modal.hbs';

export class Modal extends Block {
  constructor(props: IProps) {
    const classList = Modal.appendClassList(['Modal'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings });
  }
  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    if (newProps.error) {
      this._element.classList.add('Modal_type_error');
    } else {
      this._element.classList.remove('Modal_type_error');
    }
    return true;
  }
  show() {
    this.getContent().style.display = 'flex';
  }
  render(): DocumentFragment {
    return this.compile(modalTemplate, this.props);
  }
}

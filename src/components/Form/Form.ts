import { Block, IProps } from '../../classes/Block';
import formTemplate from './Form.hbs';

export class Form extends Block {
  constructor(props: IProps) {
    const classList = Form.appendClassList(['Form'], props);
    const settings = { hasID: true };
    super('form', { ...props, classList, settings });
  }
  componentDidMount(): void {
    this._element.querySelectorAll('.Input').forEach((input) => {
      input.classList.add('Form-Input');
    });
  }
  render(): DocumentFragment {
    return this.compile(formTemplate, this.props);
  }
}

import { Block, IProps } from '../../classes/Block';
import formTemplate from './Form.hbs';

// This component is used where inputs are arranged in InputGroup components
// containing a label and an error message.
export class Form extends Block {
  constructor(props: IProps) {
    const tagName = 'form';
    const classList = Form.appendClassList(['Form'], props);
    const settings = { hasID: true };
    super({ ...props, tagName, classList, settings });
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

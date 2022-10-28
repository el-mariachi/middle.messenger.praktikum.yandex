import { Block, IProps, IAttributes } from '../../classes/Block';
import Input from '../Input';
import groupTemplate from './InputGroup.hbs';

export type InputProps = IProps & {
  type: string;
  name: string;
  placeholder: string;
};

export class InputGroup extends Block {
  public props!: InputProps;
  protected _input!: Input;
  constructor(props: InputProps) {
    super('div', { ...props, classList: ['Input-Group'], settings: { hasID: true } });
  }
  set errorMessage(message: string) {
    this.setProps({
      errorMessage: message,
    });
  }
  init(): void {
    const { type, name, placeholder } = this.props;
    const inputClassList = ['Form-Input'];

    const attributes: IAttributes = {
      type,
      name,
      id: name,
      placeholder,
    };
    const inputProps: IProps = { attributes, classList: inputClassList };
    this._input = new Input(inputProps);
    this.children.input = this._input;
    super.init();
  }
  public focus() {
    this._input.focus();
  }

  render(): DocumentFragment {
    return this.insertChildren(groupTemplate, this.props);
  }
}

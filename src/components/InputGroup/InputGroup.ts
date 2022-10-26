import { Block, IProps, IAttributes } from '../../classes/Block';
import Input, { IInputProps } from '../Input';
import groupTemplate from './InputGroup.hbs';

interface IGroupProps extends IProps {
  type: string;
  name: string;
  placeholder: string;
}

export class InputGroup extends Block {
  public props: IGroupProps = {
    type: 'text',
    name: '',
    placeholder: '',
  };
  constructor(props: IGroupProps) {
    super('div', { ...props, classList: ['Input-Group'], settings: { hasID: true } });
  }
  init(): void {
    const { type, name, placeholder, inputClassList } = this.props;
    const classList = Array.isArray(inputClassList) ? inputClassList : [];
    const attributes: IAttributes = {
      type,
      name,
      id: name,
      placeholder,
    };
    const inputProps: IInputProps = { attributes, inputClassList: classList };
    this.children.input = new Input(inputProps);
    super.init();
  }
  render(): DocumentFragment {
    return this.insertChildren(groupTemplate, this.props);
  }
}

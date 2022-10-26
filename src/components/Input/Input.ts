import { Block, IProps } from '../../classes/Block';
import inputTemplate from './Input.hbs';

export interface IInputProps extends IProps {
  inputClassList: string[];
}

export class Input extends Block {
  constructor(props: IInputProps) {
    let classList = ['Input'];
    if (props.inputClassList) {
      classList = classList.concat(props.inputClassList);
    }

    super('input', { ...props, classList, settings: { hasID: true } });
  }
  render(): DocumentFragment {
    return this.insertChildren(inputTemplate, this.props);
  }
}

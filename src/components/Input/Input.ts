import { Block } from '../../classes/Block';
import { InputProps } from '../InputGroup';
export class Input extends Block {
  constructor(props: InputProps) {
    const tagName = 'input';
    const classList = Input.appendClassList(['Input'], props);
    const settings = { hasID: true };
    super({ ...props, tagName, classList, settings });
  }
}

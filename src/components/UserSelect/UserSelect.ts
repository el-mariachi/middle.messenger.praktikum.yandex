import { Block, IProps } from '../../classes/Block';
import template from './UserSelect.hbs';

export class UserSelect extends Block {
  constructor(props: IProps) {
    const classList = UserSelect.appendClassList(['UserSelect'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings });
  }
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

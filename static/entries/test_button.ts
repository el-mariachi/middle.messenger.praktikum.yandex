import { Block, IProps } from '../../src/classes/Block';
import template from './test_button.hbs';

export default class Button extends Block {
  constructor(props: IProps) {
    super('button', props);
  }

  render() {
    return this.insertChildren(template, this.props);
  }
}

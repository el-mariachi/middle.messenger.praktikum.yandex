import { Block, IProps } from '../../src/classes/block/Block';
import template from './test_button.hbs';

export default class Button extends Block {
  constructor(props: IProps) {
    super('button', props);
  }

  render(): string {
    return template(this.props);
  }
}

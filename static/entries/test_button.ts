import { Block, IProps } from '../../src/classes/Block';
import template from './test_button.hbs';

export default class Button extends Block {
  constructor(props: IProps) {
    super('button', props);
  }
  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    console.log('cdu button');

    return true;
  }

  render() {
    return this.insertChildren(template, this.props);
  }
}

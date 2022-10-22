import { Block, IProps } from '../../src/classes/block/Block';
import template from './test_page.hbs';
import Button from './test_button';

export default class Pg extends Block {
  constructor(props: IProps) {
    super('section', props);
  }
  init() {
    // if a child is added to this.children in the constructor, it will not be rendered initially
    // because then the first render is run just before parent constructor returns
    this.children.innerButton = new Button({
      className: 'whatever',
      title: this.props.buttonTitle,
    });
    super.init();
  }
  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    if (newProps.buttonTitle !== oldProps.buttonTitle) {
      this.children.innerButton.setProps({ title: newProps.buttonTitle });
    }
    return true;
  }

  render() {
    // return this.insertChildren(template, this.props);
    return this.insertChildren(template, {
      userName: this.props.userName,
      button: this.props.button, // ! this doesn't get updated because it is stored in this.children
      // ! and this.children doesn't get updated through this.setProps()
    });
  }
}

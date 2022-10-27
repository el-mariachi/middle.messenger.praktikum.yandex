import { Block, IProps, IChildren } from '../../classes/Block';
import InputGroup from '../../components/InputGroup';
import Button from '../Button';
import formTemplate from './Form.hbs';

export interface IFormProps extends IProps {
  inputList: Array<{ [k: string]: string }>;
  buttonList: Array<IProps>;
}

type NamedInputs = {
  [k: string]: InputGroup;
};

export class Form extends Block {
  public props!: IFormProps;
  public inputs!: NamedInputs;
  public buttons!: IChildren[];
  constructor(props: IFormProps) {
    const classList = ['Form', 'Profile-Form'];
    super('form', { ...props, classList, settings: { hasID: true } });
  }
  init(): void {
    // make sure inputs and buttons are processed as arrays
    const inputData = [this.props.inputList].flat(1);
    const buttonData = [this.props.buttonList].flat(1);
    const inputMap = new Map(inputData.map((input) => [input.name, new InputGroup({ ...input })]));
    this.inputs = Object.fromEntries(inputMap);
    this.children.inputs = Object.values(this.inputs);
    this.children.buttons = buttonData.map((button) => new Button(button.tagName, button));
    super.init();
  }
  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    if (newProps.inputList !== oldProps.inputList) {
      if (Array.isArray(this.children.inputs) && Array.isArray(newProps.inputList)) {
        for (let i = 0; i < newProps.inputList.length; i++) {
          this.children.inputs[i].setProps(newProps.inputList[i]);
        }
      }
    }
    return true;
  }
  render(): DocumentFragment {
    return this.insertChildren(formTemplate, this.props);
  }
}

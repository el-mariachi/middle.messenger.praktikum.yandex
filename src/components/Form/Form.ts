import { Block, IProps } from '../../classes/Block';
import InputGroup from '../../components/InputGroup';
import formTemplate from './Form.hbs';

export interface IFormProps extends IProps {
  inputList: Array<{ [k: string]: string }>;
}

export class Form extends Block {
  constructor(props: IFormProps) {
    const classList = ['Form', 'Profile-Form'];
    super('form', { ...props, classList, settings: { hasID: true } });
  }
  init(): void {
    const inputClassList = ['Form-Input'];
    if (Array.isArray(this.props.inputList)) {
      this.children.inputs = this.props.inputList.map((inputData) => new InputGroup({ ...inputData, inputClassList }));
    }
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

import { Block, IProps, IChildren } from '../../classes/Block';
import InputGroup, { InputProps } from '../../components/InputGroup';
import Button from '../Button';
import formTemplate from './Form.hbs';

export interface IFormProps extends IProps {
  inputList: InputProps[];
  buttonList: IProps[];
}

type NamedInputs = {
  [k: string]: InputGroup;
};

export class Form extends Block {
  public props!: IFormProps;
  public inputs!: NamedInputs;
  public buttons!: IChildren[];
  protected _userSubmitHandler: EventListener | EventListener[] | undefined;
  constructor(props: IFormProps) {
    let classList = ['Form'];
    if (props.classList) {
      classList = classList.concat(props.classList);
    }
    super('form', { ...props, classList, settings: { hasID: true } });
  }
  init(): void {
    // make sure inputs and buttons are processed as (flat) arrays
    const inputData = [this.props.inputList].flat();
    const buttonData = [this.props.buttonList].flat();
    const inputMap = new Map(inputData.map((input) => [input.name, new InputGroup({ ...input })]));
    this.inputs = Object.fromEntries(inputMap);
    // set up password2
    if (this.inputs.password && this.inputs.password2) {
      // TODO set password2 regex to password value
    }
    this.children.inputs = Object.values(this.inputs);
    this.children.buttons = buttonData.map((button) => new Button(button.tagName, button));

    // handling submit and validation
    const { events } = this.props;
    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    const instance = this;
    // our event handler
    function submit(this: HTMLFormElement, event: Event): boolean {
      event.preventDefault();
      if (instance.isValid()) {
        if (instance._userSubmitHandler) {
          [instance._userSubmitHandler].flat().forEach((handler) => {
            handler.call(this, event);
          });
        }
        return true;
      } else {
        if (instance._userSubmitHandler) {
          [instance._userSubmitHandler].flat().forEach((handler) => {
            handler.call(null, event);
          });
        }
      }
      return false;
    }
    if (events && events.submit) {
      this._userSubmitHandler = events.submit;
      // replace user handler with ours
      events.submit = submit;
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
  isValid() {
    return Object.values(this.inputs)
      .map((input) => input.valid)
      .reduce((result, current) => result && current, true);
  }
  render(): DocumentFragment {
    return this.insertChildren(formTemplate, this.props);
  }
}

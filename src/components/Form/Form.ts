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
    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    const instance = this;
    function passwordsEqual(this: HTMLInputElement) {
      instance.inputs.password2.validator = this.value.replace(/([$()*+.?[^{|\\])/g, '\\$1');
    }
    // make sure inputs and buttons are processed as (flat) arrays
    const inputData = [this.props.inputList].flat();
    // set up password2
    const forPassword = inputData.filter((inp) => inp.name === 'password')[0];
    const forPassword2 = inputData.filter((inp) => inp.name === 'password2')[0];
    if (forPassword && forPassword2) {
      forPassword.events = {
        blur: passwordsEqual,
      };
    }
    const inputMap = new Map(inputData.map((input) => [input.name, new InputGroup({ ...input })]));
    this.inputs = Object.fromEntries(inputMap);

    this.children.inputs = Object.values(this.inputs);

    const buttonData = [this.props.buttonList].flat();
    this.children.buttons = buttonData.map((button) => new Button(button.tagName, button));

    // handling submit and validation
    const { events } = this.props;
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

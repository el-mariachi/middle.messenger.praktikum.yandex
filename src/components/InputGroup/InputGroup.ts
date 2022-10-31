import { Block, IProps, EventsProp, IAttributes } from '../../classes/Block';
import Input from '../Input';
import groupTemplate from './InputGroup.hbs';

export type InputProps = IProps & {
  type: string;
  name: string;
  placeholder: string;
  test?: RegExp;
  valid?: boolean;
};

export class InputGroup extends Block {
  public props!: InputProps;
  protected _input!: Input;
  protected _label: HTMLElement | null = null;
  protected _error: HTMLElement | null = null;
  protected _regex: RegExp | null;
  protected _valid = true;
  constructor(props: InputProps) {
    // intercept outer eventListeners
    super('div', { ...props, classList: ['Input-Group'], settings: { hasID: true }, valid: true });
    this._regex = this.props.test ? this.props.test : null;
  }
  set errorMessage(message: string) {
    this.setProps({
      errorMessage: message,
    });
  }
  get validatorRE() {
    return this._regex;
  }
  set validator(value: string) {
    this._regex = new RegExp(`^${value}$`);
  }
  get value(): string {
    return this._input.getContent().value;
  }
  set value(newValue: string) {
    this._input.getContent().value = newValue;
  }
  get valid(): boolean {
    this._valid = this._regex ? this._regex.test(this._input.getContent().value) : true;
    this.showValidity();
    return this._valid;
  }
  set valid(value: boolean) {
    this._valid = value;
    this.showValidity();
  }
  showValidity() {
    if (this._valid) {
      this.hideError();
    } else {
      this.showError();
    }
  }
  showError(): void {
    this._error && this._error.classList.add('Input_errorvisible');
  }
  hideError(): void {
    this._error && this._error.classList.remove('Input_errorvisible');
  }
  showLabel() {
    this._label && this._label.classList.remove('Input_labelhidden');
  }
  hideLabel() {
    this._label && this._input.getContent().value === '' && this._label.classList.add('Input_labelhidden');
  }
  init(): void {
    // We can extract events from props before the super() call
    const { type, name, placeholder, events } = this.props;
    // We're not adding any event listeners on the outer DOM element of InputGroup
    // passing them all down to the input element
    delete this.props.events;
    const inputClassList = ['Form-Input'];
    const localEvents: EventsProp = {
      focus: () => {
        this.showLabel();
        this.valid = true;
      },
      blur: () => {
        this.hideLabel();
        return this.valid;
      },
    };
    Object.entries(localEvents).forEach(([eventName, localHandler]) => {
      // merge in outer events
      if (events && events[eventName]) {
        localEvents[eventName] = [...[events[eventName]].flat()].concat(localHandler);
        delete events[eventName]; // we don't need it anymore
      }
    });
    // Pass down what's left of outer events
    Object.assign(localEvents, events);
    const attributes: IAttributes = {
      type,
      name,
      id: name,
      placeholder,
    };
    const inputProps: IProps = { attributes, events: localEvents, classList: inputClassList };
    this._input = new Input(inputProps);
    this.children.input = this._input;
    super.init();
  }
  componentDidMount(): void {
    this._label = this.element.querySelector('.Input-Label');
    this._error = this.element.querySelector('.Input-Error');
  }
  public focus() {
    this._input.focus();
  }

  render(): DocumentFragment {
    return this.compile(groupTemplate, this.props);
  }
}

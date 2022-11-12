import { Block, IProps } from '../../classes/Block';
import { EventBusSingl, EventData } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import Input from '../Input';
import InputError from '../InputError';
import groupTemplate from './InputGroup.hbs';

export type InputProps = IProps & {
  type: string;
  name: string;
  placeholder: string;
  test?: RegExp;
  valid?: boolean;
};

const appBus = new EventBusSingl();
// InputGroup will have two children: input & inputError
export class InputGroup extends Block {
  // public name = '';
  // protected _label: HTMLElement | null = null;
  protected _input!: Input;
  protected _error!: InputError;
  constructor(props: IProps) {
    const classList = InputGroup.appendClassList(['Input-Group'], props);
    const settings = { hasID: true };
    super({ ...props, classList, settings });
  }

  init() {
    this._error = [this.children.inputError].flat()[0];
    this._input = [this.children.input].flat()[0];
    this._error.setProps({
      name: this._input.props.name,
    });
    super.init();
  }
  componentDidMount(): void {
    this.setProps({
      label: this._input.props.label,
      inputName: this._input.props.name,
    });
    appBus.on(EVENTS.INPUT_FOCUS, this.showLabel.bind(this));
    appBus.on(EVENTS.INPUT_BLUR, this.hideLabel.bind(this));
  }
  showLabel(eventData: EventData) {
    if (eventData.name === this.props.inputName) {
      const label = this.element.querySelector('.Input-Label');
      label && label.classList.remove('Input_labelhidden');
    }
  }
  hideLabel(eventData: EventData) {
    if (eventData.name === this.props.inputName) {
      const label = this.element.querySelector('.Input-Label');
      label && eventData.value === '' && label.classList.add('Input_labelhidden');
    }
  }
  render(): DocumentFragment {
    return this.compile(groupTemplate, this.props);
  }
}

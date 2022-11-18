import { Block, IProps } from '../../classes/Block';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import inputErrorTemplage from './InputError.hbs';
import { EVENTS } from '../../constants/events';

type ErrorProps = {
  name: string;
  errorMessage?: string;
};

export class InputError extends Block {
  constructor(props: IProps) {
    const tagName = 'span';
    const classList = InputError.appendClassList(['Input-Error'], props);
    const settings = { hasID: true };
    super({ ...props, tagName, classList, settings });
    const appBus = new EventBusSingl();
    appBus.on(EVENTS.INPUT_ERROR, this.showError.bind(this));
    appBus.on(EVENTS.INPUT_OK, this.hideError.bind(this));
  }
  showError({ name, errorMessage }: ErrorProps): void {
    if (name === this.props.name) {
      errorMessage && this.setProps({ errorMessage });
      this._element.classList.add('Input_errorvisible');
    }
  }
  hideError({ name }: ErrorProps): void {
    if (name === this.props.name) {
      this._element.classList.remove('Input_errorvisible');
    }
  }
  render(): DocumentFragment {
    return this.compile(inputErrorTemplage, this.props);
  }
}

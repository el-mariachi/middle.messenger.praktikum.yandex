import { EventBusSingl, EventData } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { InputProps } from '../components/InputGroup';

const appBus = new EventBusSingl();

type ValidatorOptions = {
  password: {
    source: string;
    target: string;
  };
};

export class FormValidator {
  public inputs: { [k: string]: InputProps };
  constructor(public inputsArray: InputProps[], public options?: ValidatorOptions) {
    this.inputs = inputsArray.reduce((result, current) => Object.assign(result, { [current.name]: current }), {});

    if (options?.password) {
      // add a special handler for password2 to set it's test value
      appBus.on(EVENTS.INPUT_BLUR, this.passwordEqual.bind(this));
    }
    appBus.on(EVENTS.INPUT_BLUR, this.validateInput.bind(this));
    appBus.on(EVENTS.INPUT_FOCUS, this.resetInput.bind(this));
    appBus.on(EVENTS.FORM_SUBMIT, this.validateForm.bind(this));
  }
  passwordEqual(eventData: EventData) {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const password = this.options!.password.source;
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const password2 = this.options!.password.target;
    if (eventData.name === password) {
      // Prepare validation string for password equality
      const reString = eventData.value.replace(/([$()*+.?[^{|\\])/g, '\\$1');
      // Crate RE and set it for password2
      this.inputs[password2].test = new RegExp(`^${reString}$`);
    }
  }
  validateInput(eventData: EventData): boolean {
    const { name, value } = eventData;
    return this.checkInput(name, value);
  }
  checkInput(name: string, value: string): boolean {
    // Pick an input
    const currentInput = this.inputs[name];
    currentInput.valid = currentInput.test ? currentInput.test.test(value) : true;
    if (!currentInput.valid) {
      const { errorMessage } = currentInput;
      appBus.emit(EVENTS.INPUT_ERROR, { name, errorMessage });
      return false;
    }
    return true;
  }
  resetInput(eventData: EventData) {
    const { name } = eventData;
    appBus.emit(EVENTS.INPUT_OK, { name });
  }
  validateForm(form: HTMLFormElement) {
    const formValid = Object.keys(this.inputs)
      .map((inputName) => this.checkInput(inputName, form[inputName].value))
      .reduce((result, current) => result && current, true);
    if (formValid) {
      appBus.emit(EVENTS.FORM_VALID, form);
    }
  }
}

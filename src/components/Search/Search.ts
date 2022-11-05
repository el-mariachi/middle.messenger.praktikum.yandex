import { Block, IProps } from '~/src/classes/Block';
import { FormValidator } from '~/src/controllers/FormValidator';
import Input from '~/src/components/Input';
import { InputProps } from '~/src/components/InputGroup';
import searchTemplate from './Search.hbs';
import { EventBusSingl } from '~/src/controllers/EventBusSingl';
import { EVENTS } from '~/src/constants/events';
import submitForm from '~/src/controllers/submitForm';
import prepInputAttrs from '~/src/utils/prepInputAttrs';
import { FormSender } from '~/src/controllers/FormSender';

const appBus = new EventBusSingl();

const searchInputData: InputProps = {
  classList: ['Search-Input', 'Input_theme_grey'],
  type: 'search',
  name: 'search',
  placeholder: 'Поиск',
  test: /.{3,}/,
  events: {
    keyup: () => {
      // trig click in serarc form's submit btn
      appBus.emit(EVENTS.SEARCH_UPDATE);
    },
  },
};
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error unused var
const validator = new FormValidator([searchInputData], { formName: 'search_form' });
// @ts-expect-error unused var
const sender = new FormSender('search_form');
/* eslint-enable @typescript-eslint/no-unused-vars */

const searchInput = new Input(prepInputAttrs(searchInputData));

export class Search extends Block {
  constructor(props: IProps) {
    const classList = Search.appendClassList(['Search'], props);
    const attributes = { name: 'search_form' };
    const events = { submit: submitForm };
    super('form', { ...props, classList, attributes, events, searchInput });
  }
  componentDidMount(): void {
    appBus.on(EVENTS.SEARCH_UPDATE, this.submit.bind(this));
    appBus.on(EVENTS.INPUT_ERROR, this.searchError.bind(this));
  }
  searchError() {
    // TODO
  }
  submit() {
    const submitButton = this._element.querySelector('button.Search-Submit');
    submitButton && submitButton instanceof HTMLButtonElement && submitButton.click();
  }
  render(): DocumentFragment {
    return this.compile(searchTemplate, this.props);
  }
}

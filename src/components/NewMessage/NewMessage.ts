import { Block, IProps } from '../../classes/Block';
import newMessageTemplate from './NewMessage.hbs';
import Input from '../Input';
import { InputProps } from '../InputGroup';
import prepInputAttrs from '../../utils/prepInputAttrs';
import Button from '../Button';
import { FormValidator } from '../../controllers/FormValidator';
import submitForm from '../../controllers/submitForm';
import { FormSender } from '../../controllers/FormSender';

const newMessageInputData: InputProps = {
  classList: ['NewMessage', 'Input_theme_grey'],
  type: 'text',
  name: 'message',
  placeholder: 'Сообщение',
  test: /.+/,
};
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error unused var
const sendValidator = new FormValidator([newMessageInputData], { formName: 'compose_form' });
// @ts-expect-error unused var
const sender = new FormSender('compose_form');
/* eslint-enable @typescript-eslint/no-unused-vars */

const newMessageInput = new Input(prepInputAttrs(newMessageInputData));

const sendButtonData = {
  attributes: {
    type: 'submit',
  },
  classList: ['Send', 'Compose-Send', 'Icon', 'Icon_type_send'],
};

const sendButton = new Button(sendButtonData);

export class NewMessage extends Block {
  constructor(props: IProps) {
    const tagName = 'form';
    const classList = NewMessage.appendClassList(['Compose-Form'], props);
    const attributes = { name: 'compose_form' };
    const events = { submit: submitForm };
    const settings = { hasID: true };
    super({ ...props, tagName, classList, attributes, events, settings, newMessageInput, sendButton });
  }
  render(): DocumentFragment {
    return this.compile(newMessageTemplate, this.props);
  }
}

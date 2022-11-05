import { Block, IProps } from '~/src/classes/Block';
import newMessageTemplate from './NewMessage.hbs';
import Input from '~/src/components/Input';
import { InputProps } from '~/src/components/InputGroup';
import prepInputAttrs from '~/src/utils/prepInputAttrs';
import Button from '~/src/components/Button';
import { FormValidator } from '~/src/controllers/FormValidator';
import submitForm from '~/src/controllers/submitForm';
import { FormSender } from '~/src/controllers/FormSender';

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
  tagName: 'button',
  attributes: {
    type: 'submit',
  },
  classList: ['Send', 'Compose-Send', 'Icon', 'Icon_type_send'],
};

const sendButton = new Button(sendButtonData.tagName, sendButtonData);

export class NewMessage extends Block {
  constructor(props: IProps) {
    const classList = NewMessage.appendClassList(['Compose-Form'], props);
    const attributes = { name: 'compose_form' };
    const events = { submit: submitForm };
    const settings = { hasID: true };
    super('form', { ...props, classList, attributes, events, settings, newMessageInput, sendButton });
  }
  render(): DocumentFragment {
    return this.compile(newMessageTemplate, this.props);
  }
}

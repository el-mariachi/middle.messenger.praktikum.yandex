import { Block, IProps } from '../../classes/Block';
import newMessageTemplate from './NewMessage.hbs';
import Input from '../Input';
import prepInputAttrs from '../../utils/prepInputAttrs';
import Button from '../Button';
import submitForm from '../../controllers/submitForm';
import { newMessageInputData, sendMessageButtonData } from '../../constants/messages';
import clearInputs from '../../utils/clearInputs';

const newMessageInput = new Input(prepInputAttrs(newMessageInputData));
const sendButton = new Button(sendMessageButtonData);

export class NewMessage extends Block {
  constructor(props: IProps) {
    const tagName = 'form';
    const classList = NewMessage.appendClassList(['Compose-Form'], props);
    const attributes = { name: 'compose_form' };
    const events = { submit: [submitForm, clearInputs] };
    const settings = { hasID: true };
    super({ ...props, tagName, classList, attributes, events, settings, newMessageInput, sendButton });
  }
  render(): DocumentFragment {
    return this.compile(newMessageTemplate, this.props);
  }
}

import Message from '../components/Message';
import { MessageProps } from '../components/Message/Message';

export default function createMessage(messageData: MessageProps): Message {
  const message = new Message(messageData);
  message.dispatchComponentDidMount();
  return message;
}

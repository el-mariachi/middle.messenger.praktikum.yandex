import { State, MessageData } from '../store/Store';
import { Indexed } from './merge';
import { MessageProps } from '../components/Message/Message';
import createMessage from './createMessage';

export default function mapMessagesToProps(state: State): Indexed {
  const { user, messagesData } = state;
  const messages = messagesData.filter(messageFilter).map(setMessageProps).map(createMessage);
  return { messages };
  function messageFilter(messageData: MessageData): boolean {
    return messageData.type === 'message';
  }
  function setMessageProps(messageData: MessageData): MessageProps {
    return {
      ...messageData,
      direction: messageData.user_id === user.id ? 'Message_type_outgoing' : 'Message_type_incoming',
      timestamp: new Date(messageData.time).toLocaleTimeString().substring(0, 5),
    };
  }
}

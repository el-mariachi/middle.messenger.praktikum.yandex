import './MessageAreaHeader.scss';
import { MessageAreaHeader } from './MessageAreaHeader';
import { withCurrentChat } from '../../utils/connect';

export default withCurrentChat(MessageAreaHeader);

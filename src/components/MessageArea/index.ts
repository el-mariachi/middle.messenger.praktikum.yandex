import './MessageArea.scss';
import { MessageArea } from './MessageArea';
import { withCurrentChat } from '../../utils/connect';
import { withMessages } from '../../utils/connect';

export default withMessages(withCurrentChat(MessageArea));

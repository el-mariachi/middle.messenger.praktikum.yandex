import './MessageArea.scss';
import { MessageArea } from './MessageArea';
import { withCurrentChat } from '../../utils/connect';

export default withCurrentChat(MessageArea);

import './UserSelect.scss';
import { UserSelect } from './UserSelect';
import { withUserList } from '../../utils/connect';

export default withUserList(UserSelect);

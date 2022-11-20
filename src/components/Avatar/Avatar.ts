import { Block, IProps } from '../../classes/Block';
import avatarTemplate from './Avatar.hbs';
import { UserData } from '../../store/Store';
import defaultAvatar from '../../../static/images/chuvak130.png';

export class Avatar extends Block {
  constructor(props: IProps) {
    const tagName = 'label';
    let classList;
    const { editable } = props;
    if (editable) {
      classList = Avatar.appendClassList(['Avatar', 'Avatar-Edit'], props);
    } else {
      classList = Avatar.appendClassList(['Avatar'], props);
    }
    const settings = { hasID: true };
    const attributes = { for: 'avatar' };
    super({ ...props, tagName, classList, settings, attributes });
  }
  render(): DocumentFragment {
    const user = this.props.user as UserData;
    if (user && (user.avatar === '' || user.avatar === null)) {
      user.avatar = defaultAvatar;
    }
    return this.compile(avatarTemplate, this.props);
  }
}

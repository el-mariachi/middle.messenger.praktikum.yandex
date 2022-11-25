import { Block, IProps } from '../../classes/Block';
import avatarTemplate from './Avatar.hbs';
import { UserData } from '../../store/Store';
import defaultAvatar from '../../../static/images/chuvak130.png';
import { BASE_URL } from '../../constants/api';

type AvatarProps = IProps & {
  imageLoadHandler: EventListener;
};

export class Avatar extends Block {
  private imageLoadHandler?: EventListener;
  constructor(props: AvatarProps) {
    const tagName = 'label';
    let classList;
    const { editable, imageLoadHandler } = props;
    if (editable) {
      classList = Avatar.appendClassList(['Avatar', 'Avatar-Edit'], props);
    } else {
      classList = Avatar.appendClassList(['Avatar'], props);
    }
    const settings = { hasID: true };
    const attributes = { for: 'avatar' };
    super({ ...props, tagName, classList, settings, attributes });
    if (imageLoadHandler) {
      this.imageLoadHandler = imageLoadHandler;
    }
  }
  addEvents(): void {
    if (this.imageLoadHandler) {
      const imageInput = this._element.querySelector('.Input-File');
      if (imageInput) {
        imageInput.addEventListener('change', this.imageLoadHandler);
      }
    }
  }
  removeEvents(): void {
    if (this.imageLoadHandler) {
      const imageInput = this._element.querySelector('.Input-File');
      if (imageInput) {
        imageInput.removeEventListener('change', this.imageLoadHandler);
      }
    }
  }
  render(): DocumentFragment {
    let avatarUrl: string;
    const user = this.props.user as UserData;
    if (user && (user.avatar === '' || user.avatar === null)) {
      avatarUrl = defaultAvatar;
    } else {
      avatarUrl = `${BASE_URL}/resources/${user.avatar}`;
    }
    return this.compile(avatarTemplate, { ...this.props, avatarUrl });
  }
}

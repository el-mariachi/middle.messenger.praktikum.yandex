import { Block, IProps } from '../../classes/Block';
import avatarTemplate from './Avatar.hbs';

export class Avatar extends Block {
  constructor(props: IProps) {
    const classList = Avatar.appendClassList(['Form-ImageInput'], props);
    const settings = { hasID: true };
    const attributes = { for: 'avatar' };
    super('label', { ...props, classList, settings, attributes });
  }
  render(): DocumentFragment {
    return this.compile(avatarTemplate, this.props);
  }
}

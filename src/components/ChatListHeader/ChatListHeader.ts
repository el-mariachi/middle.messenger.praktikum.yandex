import { Block, IProps } from '~/src/classes/Block';
import headerTemplate from './ChatListHeader.hbs';
import Link from '~/src/components/Link';

const profileUrl = new URL('/src/pages/edit_profile/edit_profile.handlebars', import.meta.url);

const profileLink = new Link({
  text: 'Профиль',
  classList: ['PageLink', 'PageLink_to_profile'],
  attributes: {
    href: profileUrl,
  },
});

export class ChatListHeader extends Block {
  constructor(props: IProps) {
    const classList = ChatListHeader.appendClassList(['ChatListHeader'], props);
    super('div', { ...props, classList, profileLink });
  }
  render(): DocumentFragment {
    return this.compile(headerTemplate, this.props);
  }
}

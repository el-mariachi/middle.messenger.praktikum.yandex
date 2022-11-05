import { Block, IProps } from '~/src/classes/Block';
import composeTemplate from './Compose.hbs';
import NewMessage from '~/src/components/NewMessage';
import Menu from '~/src/components/Menu';
import Button from '~/src/components/Button';

const photoLink = new Button('button', {
  text: 'Фото/Видео',
  classList: ['Menu-Link', 'Menu_linktype_photo'],
});

const fileLink = new Button('button', {
  text: 'Файл',
  classList: ['Menu-Link', 'Menu_linktype_file'],
});

const composeMenuData: IProps = {
  menuName: 'Меню вложений',
  classList: ['Compose-Menu', 'Icon', 'Icon_type_attach'],
  menuItems: [photoLink, fileLink],
  bodyType: 'Menu_bodytype_attach',
};

const composeMenu = new Menu(composeMenuData);

const newMessage = new NewMessage({});

export class Compose extends Block {
  constructor(props: IProps) {
    const classList = Compose.appendClassList(['Compose'], props);
    super('div', { ...props, classList, newMessage, composeMenu });
  }
  render(): DocumentFragment {
    return this.compile(composeTemplate, this.props);
  }
}

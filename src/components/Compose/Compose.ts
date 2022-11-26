import { Block, IProps } from '../../classes/Block';
import composeTemplate from './Compose.hbs';
import NewMessage from '../NewMessage';
import Menu from '../Menu';
import Button from '../Button';

const photoLink = new Button({
  tagName: 'button',
  text: 'Фото/Видео',
  classList: ['Menu-Link', 'Menu_linktype_photo'],
});

const fileLink = new Button({
  tagName: 'button',
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
    super({ ...props, classList, newMessage, composeMenu });
  }
  render(): DocumentFragment {
    return this.compile(composeTemplate, this.props);
  }
}

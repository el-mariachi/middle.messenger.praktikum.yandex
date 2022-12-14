import { Block, IProps } from '../../classes/Block';
import menuTemplate from './Menu.hbs';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';

const appBus = new EventBusSingl();

export class Menu extends Block {
  constructor(props: IProps) {
    const tagName = 'nav';
    const classList = Menu.appendClassList(['Menu'], props);
    const settings = { hasID: true };
    super({ ...props, tagName, classList, settings });
  }
  componentDidMount(): void {
    this._element.addEventListener('click', () => {
      this.toggle();
    });
    appBus.on(EVENTS.PAGE_CLICK, this.hideMenu.bind(this));
  }
  hideMenu(evt: Event) {
    if (!evt.composedPath().includes(this._element)) {
      this.hide();
    }
  }
  toggle() {
    if (this._element.classList.contains('Menu_active')) {
      this.hide();
    } else {
      this.show();
    }
  }
  show(): void {
    this._element.classList.add('Menu_active');
  }
  hide() {
    this._element.classList.remove('Menu_active');
  }
  render(): DocumentFragment {
    return this.compile(menuTemplate, this.props);
  }
}

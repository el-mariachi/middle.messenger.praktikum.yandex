import { Block } from './Block';
import { isEqual } from '../utils/isEqual';
import { renderDOM } from '../utils/renderDOM';

export default class Route {
  protected _pathname: string;
  protected _blockClass: any;
  protected _block: any = null;
  protected _props: any;
  constructor(pathname: string, view: Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }
  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }
  leave() {
    if (this._block) {
      this._block.hide();
    }
  }
  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }
  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDOM(this._props.rootQuery, this._block);
      return;
    }
    this._block.show();
  }
}

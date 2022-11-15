import { Block } from './Block';
// import isEqual from '../utils/isEqual';
import { renderDOM } from '../utils/renderDOM';

type RouteProps = {
  rootQuery: string;
};

export default class Route {
  protected _pathname: string;
  protected _blockClass: new () => Block;
  protected _block: Block | null = null;
  protected _props: RouteProps;
  constructor(pathname: string, view: new () => Block, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }
  navigate(pathname: string) {
    if (this.match(pathname)) {
      // this._pathname = pathname;
      this.render();
    }
  }
  leave() {
    if (this._block) {
      this._block.hide();
    }
  }
  match(pathname: string) {
    return pathname === this._pathname;
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

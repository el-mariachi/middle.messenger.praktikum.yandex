import { Block } from './Block';
import { renderDOM } from '../utils/renderDOM';

type RouteProps = {
  rootQuery: string;
};
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Constructable<T = any> = new (...args: any[]) => T;

export default class Route {
  protected _pathname: string;
  protected _blockClass: Constructable<Block>;
  protected _block: Block | null = null;
  protected _props: RouteProps;
  constructor(pathname: string, view: Constructable<Block>, props: RouteProps) {
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
      this._block = new this._blockClass({});
      renderDOM(this._props.rootQuery, this._block);
      return;
    }
    this._block.show();
  }
}

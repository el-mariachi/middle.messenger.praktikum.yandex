import { EventBus } from '../../controllers/EventBus/EventBus';
import { v4 as uniqueID } from 'uuid';

interface IEventBusGetter {
  (): EventBus;
}

type EventsProp = {
  [k: string]: (event: Event) => unknown;
};
export interface IProps {
  [k: string]: unknown;
  events?: EventsProp;
  settings?: {
    [k: string]: unknown;
    hasID?: boolean;
  };
}
export abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected _element!: HTMLElement; // Using Definite assignment here because this._element is definitely assigned during init.
  protected _meta: { tagName: string; props?: object };
  protected eventBus: IEventBusGetter;
  protected _newPropsCount = 0;
  protected _propsChanged = false;
  protected _id: string; // use it if you like, but it's always there (UUID)

  constructor(public tagName = 'div', public props: IProps = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this._id = uniqueID();

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(): void {
    // should be overridden in descendatns
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: IProps, newProps: IProps): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    // this method if overridden can cancel render by returning false
    1 && oldProps && newProps;
    return true;
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps || Object.keys(nextProps).length === 0) {
      return;
    }
    this._newPropsCount = Object.keys(nextProps).length;
    if (this._newPropsCount === 0) {
      return;
    }
    // ! if some prop's value is an object literal, CDU will be triggered
    // even if the contents are identical
    this._meta.props = Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _addEvents() {
    const { events } = this.props;
    if (!events) {
      return;
    }
    Object.keys(events).forEach((eventName) => {
      if (!(typeof events[eventName] === 'function')) {
        throw new Error(`Event handler for event ${eventName} in ${this.constructor.name}`);
      }
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events } = this.props;
    if (!events) {
      return;
    }
    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = block;
    this._addEvents();
  }

  render(): string {
    // Should be overridden in descendatns. Returns markup.
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: IProps) {
    const proxyDescriptor = {
      get: (target: IProps, prop: string): unknown => {
        if (prop.indexOf('_') === 0) {
          throw new Error('Access denied');
        } else {
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        }
      },
      set: (target: IProps, prop: string, value: unknown): boolean => {
        if (prop.indexOf('_') === 0) {
          this._newPropsCount = 0; // ! reset incoming props count. change this if throw is removed
          throw new Error('Access denied');
        } else {
          if (target[prop] !== value) {
            target[prop] = value;
            this._propsChanged = true;
          }
        }
        if (--this._newPropsCount === 0 && this._propsChanged) {
          // emit CDU only after all new props have been examined and at least one was changed
          this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._meta.props, target);
          this._propsChanged = false; // reset flag
        }
        return true;
      },
      deleteProperty(target: IProps, prop: string): boolean {
        if (prop.indexOf('_') === 0) {
          throw new Error('Access denied');
        } else {
          delete target[prop];
          return true;
        }
      },
      ownKeys(target: IProps) {
        return Object.keys(target).filter((key) => !key.startsWith('_'));
      },
    };

    return new Proxy(props, proxyDescriptor);
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    const needsId = this.props.settings?.hasID ? true : false;
    if (needsId) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;

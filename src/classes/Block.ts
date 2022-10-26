import { EventBus } from '../controllers/EventBusExt';
import { v4 as uniqueID } from 'uuid';
import { TemplateDelegate } from 'handlebars';
interface IEventBusGetter {
  (): EventBus;
}

type EventsProp = {
  [k: string]: (event: Event) => unknown;
};
interface IChildren {
  [k: string]: Block | Block[];
}

export interface IAttributes {
  [k: string]: string | boolean;
}
export interface IProps {
  [k: string]: unknown;
  events?: EventsProp;
  classList?: string[];
  attributes?: IAttributes;
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
  protected _meta: { tagName: string; props?: IProps };
  protected eventBus: IEventBusGetter;
  protected _newPropsCount = 0;
  protected _propsChanged = false;
  protected _id?: string;
  protected _attributes?: IAttributes;
  protected _classList?: string[];
  public children: IChildren;
  public props: IProps;

  constructor(public tagName = 'div', public allProps: IProps = {}) {
    const { attributes, classList } = allProps;
    this._attributes = attributes && Object.keys(attributes).length !== 0 ? attributes : undefined;
    this._classList = classList && classList.length !== 0 ? classList : undefined;
    const { children, props } = this._getChildren(allProps);
    this.children = children;
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };
    const needsId = props.settings?.hasID ? true : false;
    if (needsId) {
      this._id = uniqueID();
      this.props = this._makePropsProxy({ ...props, __id: this._id });
    } else {
      this.props = this._makePropsProxy({ ...props });
    }

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _isBlock = (prop: unknown): prop is Block => prop instanceof Block;

  _getChildren(propsAndChildren: IProps) {
    const children: IChildren = {};
    const props: IProps = {};

    Object.entries(propsAndChildren).forEach(([propName, propValue]) => {
      if (this._isBlock(propValue)) {
        children[propName] = propValue;
      } else if (Array.isArray(propValue) && propValue.every(this._isBlock)) {
        // propValue is a pure children array
        children[propName] = propValue;
      } else {
        props[propName] = propValue;
      }
    });
    return { children, props };
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName, this._classList, this._attributes);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((inner) => {
          inner.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
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

  setProps(nextPropsAndChildren: IProps): void {
    if (!nextPropsAndChildren || Object.keys(nextPropsAndChildren).length === 0) {
      return;
    }
    // separate props from children like in the constructor
    const { children: nextChildren, props: nextProps } = this._getChildren(nextPropsAndChildren);

    this._newPropsCount = Object.keys(nextProps).length;

    // Update children with new ones before updating props
    if (Object.keys(nextChildren).length > 0) {
      Object.assign(this.children, nextChildren);
      if (this._newPropsCount === 0) {
        // No other props were updated - emit and return. If count > 0, CDU gets trigd anyway.
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return;
      }
    }

    if (this._newPropsCount === 0) {
      return;
    }
    // if some prop's value is an object literal, CDU will be triggered
    // even if the contents are identical
    Object.assign(this.props, nextProps);
    Object.assign(this._meta.props, nextProps);
  }

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

  // we will generate markup in this method and then call it from render()
  insertChildren(template: TemplateDelegate, props: IProps): DocumentFragment {
    const stubbedProps = { ...props }; // make a copy of props. we'll modify that object
    // Iterate over children and create props for each child.
    // Prop name is child name, prop value is a string containing markup,
    // (a <div> with the child's id) to be replaced soon.
    // An array of children produces an array of divs.
    Object.entries(this.children).forEach(([childName, child]) => {
      if (Array.isArray(child)) {
        stubbedProps[childName] = child.map((inner) => `<div data-id="${inner._id}"></div>`);
      } else {
        stubbedProps[childName] = `<div data-id="${child._id}"></div>`;
      }
    });
    // Create wrapper element to render into, a 'template' element.
    // It has a 'DocumentFragment' as a root element
    // which we can extract and insert into DOM later.
    // And, unlike 'DocumentFragment', 'template' has 'innerHTML' for us to write into.
    const fragment = document.createElement('template');
    // insert our markup with unique divs (instead of children) into wrapper
    fragment.innerHTML = template(stubbedProps);

    // a function to replace stubs
    const replaceStub = (child: Block): void => {
      // find a stub div using child's id
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      // finally replace stub with chlid element
      stub?.replaceWith(child.getContent());
    };

    // iterate over children and locate stubs inside fragment DOM nodes
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((inner) => {
          replaceStub(inner);
        });
      } else {
        replaceStub(child);
      }
    });
    // then we render the component's template and return markup
    // dont't forget to use {{{ }}} for child placeholders
    return fragment.content;
  }

  _render(): void {
    const block = this.render(); // DocumentFragment
    this._removeEvents();
    this._element.innerHTML = ''; // clear out old markup
    this._element.appendChild(block);
    this._addEvents();
  }

  render(): DocumentFragment {
    // Should be overridden in descendatns. Returns DocumentFragment.
    const template = () => '';
    return this.insertChildren(template, this.props);
    // return document.createDocumentFragment();
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

  _createDocumentElement(tagName: string, classList?: string[], attributes?: IAttributes): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    classList && element.classList.add(...classList);
    attributes &&
      Object.entries(attributes).forEach(([attrName, attrVal]) => {
        if (typeof attrVal === 'boolean') {
          attrVal = attrName;
        }
        element.setAttribute(attrName, attrVal);
      });
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

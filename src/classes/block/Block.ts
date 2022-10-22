import { EventBus } from '../../controllers/EventBus/EventBus';
import { v4 as uniqueID } from 'uuid';
import { TemplateDelegate } from 'handlebars';
interface IEventBusGetter {
  (): EventBus;
}

type EventsProp = {
  [k: string]: (event: Event) => unknown;
};
interface IChildren {
  [k: string]: Block;
}
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
  protected _meta: { tagName: string; props?: IProps };
  protected eventBus: IEventBusGetter;
  protected _newPropsCount = 0;
  protected _propsChanged = false;
  protected _id: string; // use it if you like, but it's always there (UUID)
  public children: IChildren;
  public props: IProps;

  constructor(public tagName = 'div', public allProps: IProps = {}) {
    const { children, props } = this._getChildren(allProps);
    this.children = children;
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

  _getChildren(propsAndChildren: IProps) {
    const children: IChildren = {};
    const props: IProps = {};

    Object.entries(propsAndChildren).forEach(([propName, propValue]) => {
      if (propValue instanceof Block) {
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
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
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

  setProps = (nextPropsAndChildren: IProps) => {
    if (!nextPropsAndChildren || Object.keys(nextPropsAndChildren).length === 0) {
      return;
    }
    // separate props from children like in the constructor
    const { children: nextChildren, props: nextProps } = this._getChildren(nextPropsAndChildren);

    this._newPropsCount = Object.keys(nextProps).length;
    if (this._newPropsCount === 0) {
      return;
    }
    // blindly updating children with new ones
    Object.assign(this.children, nextChildren);
    // if some prop's value is an object literal, CDU will be triggered
    // even if the contents are identical
    Object.assign(this.props, nextProps);
    Object.assign(this._meta.props, nextProps);
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

  // we will generate markup in this method and then call it from render()
  insertChildren(template: TemplateDelegate, props: IProps): DocumentFragment {
    const stubbedProps = { ...props }; // make a copy of props. we'll modify that object
    // iterate over children and create props for each child
    // prop name is child name, prop value is a string
    // containing markup (a <div> with the child's id)
    // to be replaced soon
    Object.entries(this.children).forEach(([childName, child]) => {
      stubbedProps[childName] = `<div data-id="${child._id}"></div>`;
    });
    // Create wrapper element to render into, a 'template' element.
    // It has a 'DocumentFragment' as a root element
    // which we can extract and insert into DOM later.
    // And, unlike 'DocumentFragment', 'template' has 'innerHTML' for us to write into.
    const fragment = document.createElement('template');
    // insert our markup with unique divs (instead of children) into wrapper
    fragment.innerHTML = template(stubbedProps);
    // TODO if we want to get rid of the wrapper element in the constructor
    // TODO and have all the block's markup be defined in the template,
    // TODO we need to add _id to fragment.content.children[0] here
    // TODO instead of this._createDocumentElement() method
    // iterate over children and locate stubs inside fragment DOM nodes
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      // finally replace stub with chlid element
      stub?.replaceWith(child.getContent());
    });
    // then we render the component's template and return markup
    // dont't forget to use {{{ }}} for child placeholders
    return fragment.content;
  }

  _render(): void {
    const block = this.render();
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

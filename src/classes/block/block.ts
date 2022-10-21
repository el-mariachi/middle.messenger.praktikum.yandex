import { EventBus } from '../../controllers/EventBus/EventBus';

interface IEventBusGetter {
  (): EventBus;
}

interface IProps {
  [k: string]: unknown;
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

  constructor(public tagName = 'div', public props: IProps = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

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

  abstract componentDidMount(oldProps?: IProps): void;

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: IProps, newProps: IProps): void {
    this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    1 && oldProps && newProps;
    return true;
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    const block = this.render();
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): string {
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
          throw new Error('Access denied');
        } else {
          if (target[prop] !== value) {
            target[prop] = value;
            this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._meta.props, target);
          }
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
    };

    return new Proxy(props, proxyDescriptor);
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;

import { Block, IProps } from '../../classes/Block';

export class Input extends Block {
  constructor(props: IProps) {
    let classList = ['Input'];
    if (props.classList) {
      classList = classList.concat(props.classList);
    }
    super('input', { ...props, classList, settings: { hasID: true } });
  }
  public focus() {
    this.element.focus();
  }
}

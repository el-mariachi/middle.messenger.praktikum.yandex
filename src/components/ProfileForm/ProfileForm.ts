import Form, { IFormProps } from '../Form';

export class ProfileForm extends Form {
  constructor(props: IFormProps) {
    let classList = ['Profile-Form'];
    if (props.classList) {
      classList = classList.concat(props.classList);
    }
    super({ ...props, classList });
  }
}

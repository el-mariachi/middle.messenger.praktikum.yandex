import Form from '../Form';
import { IProps } from '../../classes/Block';
import formTemplate from './ProfileForm.hbs';

export class ProfileForm extends Form {
  constructor(props: IProps) {
    const classList = ProfileForm.appendClassList(['Profile-Form'], props);
    super({ ...props, classList });
  }
  render(): DocumentFragment {
    return this.compile(formTemplate, this.props);
  }
}

import Form from '../Form';
import { IProps } from '../../classes/Block';

export class ProfileForm extends Form {
  constructor(props: IProps) {
    const classList = ProfileForm.appendClassList(['Profile-Form'], props);
    super({ ...props, classList });
  }
}

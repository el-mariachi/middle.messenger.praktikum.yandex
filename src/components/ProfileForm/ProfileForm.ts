import Form from '../Form';
import { IProps } from '../../classes/Block';
import formTemplate from './ProfileForm.hbs';
import { UserData } from '../../store/Store';

// Inherits from Form, uses own template

export class ProfileForm extends Form {
  constructor(props: IProps) {
    const classList = ProfileForm.appendClassList(['Profile-Form'], props);
    super({ ...props, classList });
  }
  componentDidMount(): void {
    super.componentDidMount();
    this.fillForm();
  }
  fillForm() {
    Object.entries(this.props.user as UserData).forEach(([inputName, value]) => {
      const input = this._element.querySelector(`input[name="${inputName}"].Input`) as HTMLInputElement;
      if (input) {
        input.value = value ? String(value) : '';
      }
    });
  }
  render(): DocumentFragment {
    this.fillForm();
    const user = this.props.user as UserData;
    let formTitle = 'Профиль';
    if (user) {
      formTitle = user.display_name ? user.display_name : `${user.first_name} ${user.second_name}`;
    }
    return this.compile(formTemplate, { ...this.props, formTitle });
  }
}

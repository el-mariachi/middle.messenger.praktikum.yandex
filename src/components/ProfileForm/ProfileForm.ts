import Form from '../Form';
import { IProps } from '../../classes/Block';
import formTemplate from './ProfileForm.hbs';
import { getUserState } from '../../store/actions';
import { UserData } from '../../store/Store';

// Inherits from Form, uses own template

export class ProfileForm extends Form {
  constructor(props: IProps) {
    const classList = ProfileForm.appendClassList(['Profile-Form'], props);
    super({ ...props, classList });
  }
  fillForm() {
    Object.entries(this.props.user as UserData).forEach(([inputName, value]) => {
      const input = this._element.querySelector(`input[name="${inputName}"].Input`) as HTMLInputElement;
      if (input) {
        input.value = value ? String(value) : '';
      }
    });
  }
  componentDidMount(): void {
    super.componentDidMount();
    const user = getUserState();
    // const formTitle = user.display_name ? user.display_name : `${user.first_name} ${user.second_name}`;
    this.setProps({ user });
    this.fillForm();
  }
  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    this.fillForm();
    return true;
  }
  render(): DocumentFragment {
    const user = this.props.user as UserData;
    let formTitle = 'Профиль';
    if (user) {
      formTitle = user.display_name ? user.display_name : `${user.first_name} ${user.second_name}`;
    }
    return this.compile(formTemplate, { ...this.props, formTitle });
  }
}

import { Block, IProps } from '../../classes/Block';
import Form from '../../components/ProfileForm';
import addInputHandlers from '../../utils/addInputHandlers';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import pageTemplate from './edit_profile.hbs';
import { FormValidator, ValidatorOptions } from '../../controllers/FormValidator';
import { FormSender } from '../../controllers/FormSender';
import Avatar from '../../components/Avatar';

const profileName = 'Александр Новиков';

const inputData = [
  {
    name: 'first_name',
    label: 'Имя',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Имя',
    accept: '',
    value: '',
    test: /^([A-Z][A-Za-z-]*$)|([А-Я][А-Яа-я-]*$)/,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Фамилия',
    accept: '',
    value: '',
    test: /^([A-Z][A-Za-z]*$)|([А-Я][А-Яа-я-]*$)/,
  },
  {
    name: 'display_name',
    label: 'Ник',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Ник',
    accept: '',
    value: '',
    test: /^([A-Za-z]+$)|([А-Яа-я-]+$)/,
  },
  {
    name: 'login',
    label: 'Логин',
    errorMessage: 'Неверный логин',
    type: 'text',
    placeholder: 'Логин',
    accept: '',
    value: '',
    test: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
  },
  {
    name: 'email',
    label: 'Email',
    errorMessage: 'Некорректный email',
    type: 'email',
    placeholder: 'Email',
    accept: '',
    value: '',
    test: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  {
    name: 'phone',
    label: 'Телефон',
    errorMessage: 'Некорректный телефон',
    type: 'text',
    placeholder: 'Телефон',
    accept: '',
    value: '',
    test: /^\+?\d{10,15}$/i,
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    errorMessage: 'Пароль не подходит',
    type: 'password',
    placeholder: 'Новый пароль',
    accept: '',
    value: '',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
  {
    name: 'newPassword2',
    label: 'Повторите пароль',
    errorMessage: 'Пароли не совпадают',
    type: 'password',
    placeholder: 'Повторите пароль',
    accept: '',
    value: '',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    errorMessage: 'Пароль не подходит',
    type: 'password',
    placeholder: 'Старый пароль',
    accept: '',
    value: '',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
];

const validatorOptions: ValidatorOptions = {
  password: {
    source: 'newPassword',
    target: 'newPassword2',
  },
};

// Validator receives the inputs at this stage
// The avatar image file input is technically also an input
// but is added and handled independently. It doesn't get it's InputGroup

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error unused var
const validator = new FormValidator(inputData, validatorOptions);
// @ts-expect-error unused var
const sender = new FormSender();
/* eslint-enable @typescript-eslint/no-unused-vars */

const inputs = inputData.map(addInputHandlers).map(createInput);

const buttons = [
  {
    tagName: 'input',
    attributes: {
      type: 'submit',
      name: 'submit',
      value: 'Сохранить',
    },
    classList: ['Submit', 'Form-Submit'],
  },
].map((button) => new Button(button.tagName, button));

// const imageUrl = '/chat_avatar.02df8291.png';

const avatar = new Avatar({});

const formData = {
  formTitle: profileName,
  avatar,
  inputs,
  buttons,
  events: {
    submit: submitForm,
  },
};

const pageForm = new Form(formData);

export class EditProfilePage extends Block {
  constructor(props: IProps) {
    const classList = EditProfilePage.appendClassList(['Page', 'Page_type_profile'], props);
    super('main', { ...props, classList, pageForm });
  }
  render(): DocumentFragment {
    return this.compile(pageTemplate, this.props);
  }
}

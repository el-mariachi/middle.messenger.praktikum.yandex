import Page, { IProps } from '../../components/Page';
import Form from '../../components/ProfileForm';
import addInputHandlers from '../../utils/addInputHandlers';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import pageTemplate from './edit_profile.hbs';
import Avatar from '../../components/Avatar';
import profileAvatar from '../../../static/images/chat_avatar.png';
import Link from '../../components/Link';
import { inputData, buttonsData, chatListLinkData } from '../../constants/profileForm';
import { EditProfileController } from '../../controllers/EditProfileController';

const profileName = 'Александр Новиков';

const inputs = inputData.map(addInputHandlers).map(createInput);
const buttons = buttonsData.map((button) => new Button(button));
const chatListLink = new Link(chatListLinkData);

new EditProfileController();

const avatar = new Avatar({ imageUrl: profileAvatar });

const formData: IProps = {
  formTitle: profileName,
  avatar,
  inputs,
  buttons,
  events: {
    submit: submitForm,
  },
  attributes: {
    name: 'edit_profile_form',
  },
};

const pageForm = new Form(formData);

export class EditProfilePage extends Page {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = EditProfilePage.appendClassList(['Page', 'Page_type_profile'], props);
    super({ ...props, tagName, classList, pageForm, chatListLink });
  }
  render(): DocumentFragment {
    this.setPageTitle('Edit Profile');
    return this.compile(pageTemplate, this.props);
  }
}

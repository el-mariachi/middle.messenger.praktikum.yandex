import Page, { IProps, PageProps } from '../../components/Page';
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

function createPageResources(currentPath: string) {
  const profileName = 'Александр Новиков';

  const inputs = inputData.map(addInputHandlers).map(createInput);
  const buttons = buttonsData.map((button) => new Button(button));
  const chatListLink = new Link(chatListLinkData);

  new EditProfileController(currentPath);

  const avatar = new Avatar({ imageUrl: profileAvatar });

  const userInfoSet: IProps = {
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

  const userInfo = new Form(userInfoSet);
  return { pageForm: userInfo, chatListLink };
}

export class EditProfilePage extends Page {
  constructor(props: PageProps) {
    // setup root element
    const tagName = 'main';
    const classList = EditProfilePage.appendClassList(['Page', 'Page_type_profile'], props);
    // setup children
    const { pageForm, chatListLink } = createPageResources(props.currentPath);
    super({ ...props, tagName, classList, pageForm, chatListLink });
  }
  render(): DocumentFragment {
    this.setPageTitle('Edit Profile');
    return this.compile(pageTemplate, this.props);
  }
}

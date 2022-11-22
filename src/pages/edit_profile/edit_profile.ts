import Page, { IProps, PageProps } from '../../components/Page';
import Form from '../../components/ProfileForm';
import { EventBusSingl } from '../../controllers/EventBusSingl';
import { EVENTS } from '../../constants/events';
import addInputHandlers from '../../utils/addInputHandlers';
import { makeDisabled } from '../../utils/makeDisabled';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import pageTemplate from './edit_profile.hbs';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';
import {
  userInfoInputData,
  changePasswordInputData,
  userInfoButtonsData,
  updateProfileButtonsData,
  chatListLinkData,
  updateProfileValidatorOptions,
  changePasswordValidatorOptions,
  avatarInputProps,
  MODE,
} from '../../constants/profileForm';
import { UserInfoController } from '../../controllers/UserInfoController';
import { UpdateProfileController } from '../../controllers/UpdateProfileController';
import { ChangePasswordController } from '../../controllers/ChangePasswordController';
import Modal from '../../components/Modal';

const appBus = new EventBusSingl();

function createPageResources(currentPath: string) {
  const userInfoInputs = userInfoInputData.map(addInputHandlers).map(makeDisabled).map(createInput);
  const updateProfileInputs = userInfoInputData.map(addInputHandlers).map(createInput);
  const changePasswordInputs = changePasswordInputData.map(addInputHandlers).map(createInput);
  const userInfoButtons = userInfoButtonsData.map((button) => new Button(button));
  const updateProfileButtons = updateProfileButtonsData.map((button) => new Button(button));
  const changePasswordButtons = updateProfileButtonsData.map((button) => new Button(button));
  const chatListLink = new Link(chatListLinkData);
  const pageModal = new Modal({});

  new UserInfoController(currentPath, pageModal);
  new UpdateProfileController(currentPath, pageModal);
  new ChangePasswordController(currentPath, pageModal);

  const avatar = new Avatar({});
  const editAvatar = new Avatar(avatarInputProps);
  const chPasswAvatar = new Avatar({});

  const userInfoSet: IProps = {
    avatar: editAvatar,
    inputs: userInfoInputs,
    buttons: userInfoButtons,
    attributes: {
      name: 'user_info_form',
    },
  };

  const updateProfileSet: IProps = {
    avatar,
    inputs: updateProfileInputs,
    buttons: updateProfileButtons,
    events: {
      submit: submitForm,
    },
    attributes: {
      name: updateProfileValidatorOptions.formName,
    },
  };

  const changePasswordSet: IProps = {
    avatar: chPasswAvatar,
    inputs: changePasswordInputs,
    buttons: changePasswordButtons,
    events: {
      submit: submitForm,
    },
    attributes: {
      name: changePasswordValidatorOptions.formName,
    },
  };

  const userInfo = new Form(userInfoSet);
  const updateProfile = new Form(updateProfileSet);
  const changePassword = new Form(changePasswordSet);

  return { userInfo, updateProfile, changePassword, chatListLink, pageModal };
}

export class EditProfilePage extends Page {
  public userInfo;
  public updateProfile;
  public changePassword;
  constructor(props: PageProps) {
    // setup root element
    const tagName = 'main';
    const classList = EditProfilePage.appendClassList(['Page', 'Page_type_profile'], props);
    // setup children
    const { userInfo, updateProfile, changePassword, chatListLink, pageModal } = createPageResources(props.currentPath);
    super({ ...props, tagName, classList, pageForm: userInfo, chatListLink, pageModal });
    pageModal.dispatchComponentDidMount();
    this.userInfo = userInfo;
    this.updateProfile = updateProfile;
    this.changePassword = changePassword;
    appBus.on(EVENTS.SET_MODE, this.setMode.bind(this));
  }
  setMode(mode: MODE) {
    switch (mode) {
      case MODE.INFO:
        this.setProps({ pageForm: this.userInfo });
        break;
      case MODE.UPDATE:
        this.setProps({ pageForm: this.updateProfile });
        break;
      case MODE.PASSWORD:
        this.setProps({ pageForm: this.changePassword });
        break;
      default:
        this.setProps({ pageForm: this.userInfo });
        break;
    }
    this.dispatchComponentDidMount();
  }
  render(): DocumentFragment {
    this.setPageTitle('Edit Profile');
    return this.compile(pageTemplate, this.props);
  }
}

import './edit_profile.scss';
import { EditProfilePage } from './edit_profile';
import { renderDOM } from '../../utils/renderDOM';

const login = new EditProfilePage({});

renderDOM('#app', login);

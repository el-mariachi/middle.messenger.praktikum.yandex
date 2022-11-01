import './edit_profile.scss';
import { EditProfile } from './edit_profile';
import { renderDOM } from '../../utils/renderDOM';

const login = new EditProfile({});

renderDOM('#app', login);

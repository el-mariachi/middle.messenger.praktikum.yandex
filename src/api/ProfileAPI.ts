import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const profileAPITransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export type UpdateProfileRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string;
  phone: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export class ProfileAPI extends BaseAPI {
  update(user: UpdateProfileRequest): Promise<XMLHttpRequest> {
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    };
    return profileAPITransport.put('/profile', { headers, data: user });
  }
  changePassword(passwords: ChangePasswordRequest) {
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    };
    return profileAPITransport.put('/password', { headers, data: passwords });
  }
  setAvatar(form: FormData) {
    return profileAPITransport.put('/profile/avatar', { data: form });
  }
}

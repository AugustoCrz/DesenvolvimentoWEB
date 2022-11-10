import {Injectable} from '@angular/core';
import {ServiceBase} from '../base/service.base';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user/user';

@Injectable()
export class UserService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http);
  }

  get() {
    const url = `${this.BASE_URL}/user`;
    return this.http.get(url);
  }

  update(model: User) {
    const url = `${this.BASE_URL}/user`;
    return this.http.put(url, model);
  }

  updateUser(data) {
    const url = `${this.BASE_URL}/user-admin`;
    return this.http.put(url, data);
  }

  changePassword(data) {
    const url = `${this.BASE_URL}/user-admin/update-password`;
    return this.http.put(url, data);
  }

  getList(model) {
    const url = `${this.BASE_URL}/user/list`;
    return this.http.post(url, model);
  }

  getListAdmin(model) {
    const url = `${this.BASE_URL}/user-admin/list`;
    return this.http.post(url, model);
  }

  register(model) {
    const url = `${this.BASE_URL}/user-admin`;
    return this.http.post(url, model);
  }

  getProfile() {
    const url = `${this.BASE_URL}/user/list-profile`;
    return this.http.get(url);
  }

  getUser(id: string) {
    const url = `${this.BASE_URL}/user/list/${id}`;
    return this.http.get(url);
  }

  delete(id: string) {
    const url = `${this.BASE_URL}/user-admin/${id}`;
    return this.http.delete(url);
  }

  resetPassword(model) {
    const url = `${this.BASE_URL}/user/reset-password`;
    return this.http.post(url, model);
  }

}

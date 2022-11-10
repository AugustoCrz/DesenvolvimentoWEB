import {Injectable} from '@angular/core';
import {ServiceBase} from '../base/service.base';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContactService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http);
  }

  getList(model) {
    const url = `${this.BASE_URL}/contact/list`;
    return this.http.post(url, model);
  }

  get(id: string) {
    const url = `${this.BASE_URL}/contact/${id}`;
    return this.http.get(url);
  }

  contact(model) {
    const url = `${this.BASE_URL}/contact`;
    return this.http.put(url, model);
  }

  getStatus() {
    const url = `${this.BASE_URL}/contact/get-status`;
    return this.http.get(url);
  }
}

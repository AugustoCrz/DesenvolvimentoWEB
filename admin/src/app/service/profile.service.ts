import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServiceBase} from '../base/service.base';
import {Profile} from '../model/user/profile';

@Injectable()
export class ProfileService extends ServiceBase {

    constructor(http: HttpClient) {
        super(http);
    }

    get(id: string) {
        const url = `${this.BASE_URL}v1/profile/${id}`;
        return this.http.get(url);
    }

    getNew() {
        const url = `${this.BASE_URL}v1/profile/new`;
        return this.http.get(url);
    }

    list(model) {
        const url = `${this.BASE_URL}v1/profile/list`;
        return this.http.post(url, model);
    }

    create(model: Profile) {
        const url = `${this.BASE_URL}v1/profile`;
        return this.http.post(url, model);
    }

    update(model: Profile) {
        const url = `${this.BASE_URL}v1/profile`;
        return this.http.put(url, model);
    }

    delete(id: string) {
        const url = `${this.BASE_URL}v1/profile/${id}`;
        return this.http.delete(url);
    }
}

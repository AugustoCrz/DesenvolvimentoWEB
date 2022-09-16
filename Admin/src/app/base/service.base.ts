import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class ServiceBase {

  public BASE_URL = environment.base_url + '/api/v1';

  constructor(public  http: HttpClient) {
  }

  public getToken() {
    return localStorage.getItem('token') as string;
  }

  public header() {
    const customHeaders: HttpHeaders = new HttpHeaders();
    customHeaders.append('Content-Type', 'application/json');

    const token = localStorage.getItem('token') as string;

    if (token != null) {
      customHeaders.append('Authorization', 'Bearer ' + token);
    }
    return {headers: customHeaders};
  }

  /*public onError(error: Response | any) {
    console.error(error);
    return Observable.throw(error.message || error);
  }*/

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

}

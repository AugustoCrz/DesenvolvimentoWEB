import {Injectable} from '@angular/core';
import {ServiceBase} from '../base/service.base';
import {HttpClient} from '@angular/common/http';
import {News} from '../model/content/news';
import {Observable} from 'rxjs';

@Injectable()
export class BannersService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http);
  }

  update(model) {
    const url = `${this.BASE_URL}/news`;
    return this.http.put(url, model);
  }

  getList(model) {
    const url = `${this.BASE_URL}/news/list`;
    return this.http.post(url, model);
  }

  create(model) {
    const url = `${this.BASE_URL}/news`;
    return this.http.post(url, model);
  }

  uploadPicture(file, id) {
    const url = `${this.BASE_URL}/news/upload-picture/${id}`;

    return new Observable((observer) => {
      //    observer.next();
      //  observer.complete();
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      if (file != null) {
        formData.append('file', file, file.name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.getToken());
      xhr.send(formData);
    });
  }

  getNews(id: string) {
    const url = `${this.BASE_URL}/news/${id}`;
    return this.http.get(url);
  }

  delete(id: string) {
    const url = `${this.BASE_URL}/news/${id}`;
    return this.http.delete(url);
  }

}

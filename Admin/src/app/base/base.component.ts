import {Router} from '@angular/router';
import {isNullOrUndefined, isUndefined} from 'util';
import {User} from '../model/user/user';
import {NgxSpinnerService} from 'ngx-spinner';
import {RequestParameters} from '../model/request_parameters';
import Swal from 'sweetalert2';

declare function openModal(id: string, options: string): any;

declare function closeModal(id: string): any;

declare function pusher(id, token, cluster, endpoint, key, callback): any;

declare function getListEstablishment(): any;

declare function cropImage(id: string): any;

declare function changeTab(id: string, tab: string): any;

declare var $: any;
declare var moment: any;
declare var DateRangePicker: any;

export class BaseComponent {

  url = window.location.pathname;

  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  loggedUser: User = new User();

  constructor(public router: Router,
              public loading: NgxSpinnerService) {
    this.loggedUser = this.getUser();
    // console.log(this.url);
  }

  showLoading() {
    this.loading.show();
  }

  closeLoading() {
    this.loading.hide();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedUser = user;
  }

  onShowModal(id: string) {
    $(id).modal('show');
  }

  oncloseModal(id: string) {
    $(id).modal('hide');
  }

  getRequest(key: string) {
    return JSON.parse(localStorage.getItem(key)) as RequestParameters;
  }

  setRequest(key: string, request: RequestParameters) {
    localStorage.setItem(key, JSON.stringify(request));
  }

  onError(error) {
    this.loading.hide();

    if (error.status === 401) {
      this.router.navigate(['/login']);
      return;
    }

    // const e = JSON.parse(error['error']);

    if (error.status === 400) {
      this.showMessage(error['error']['message']);
      return;
    }

    if (error.status === 500) {
      this.showMessage('Ocorreu um erro com o servidor!');
      return;
    }

    // App.showMessage('Erro', e.message, 'OK', '', 'error', null);

    return (error);
  }

  showMessage(message: string, title: string = 'Atenção', mode: any = 'info', callback: any = null) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#ffde00',
    }).then((result) => {
      if (callback != null) {
        callback();
      }
    });
  }

  showConfirmMessage(message: string, callback: any = null) {
    Swal.fire({
      title: 'Atenção',
      text: message,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Tenho Certeza',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ffde00',
      cancelButtonColor: '#A71930'
    }).then((result) => {
      if (!isNullOrUndefined(result.value) && result.value === true) {
        if (callback != null) {
          callback();
        }
      }
    });
  }


  setDateRangePicker() {
    DateRangePicker.init();
  }

  getDateTimeZone(paramDate) {
    if (!paramDate) {
      return new Date();
    }
    const dataString = paramDate.split('/');
    return new Date(dataString[2], dataString[1] - 1, dataString[0]);
  }

  // getDateNowNoFormat(days: number = 0) {
  //     const date = new Date();
  //     if (days !== 0) {
  //         date.setDate(date.getDate() + days);
  //     }
  //
  //     const day = date.getDate().toString().padLeft(2, '0');
  //     const month = (date.getMonth() + 1).toString().padLeft(2, '0');
  //     const year = date.getFullYear();
  //     return year + '-' + month + '-' + day;
  // }


}

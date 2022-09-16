import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {User} from "../../model/user/user";
import {Profile} from "../../model/user/profile";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../service/user.service";
import {Settings} from "../../settings";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends BaseComponent implements OnInit {

  model: User = new User();
  listUser: User[] = [];
  listProfile: Profile[] = [];
  profileSelected: Profile = null;

  config: any;
  labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  isActiveSelect: boolean;

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public service: UserService) {
    super(router, loading);
  }

  ngOnInit(): void {
    this.onSearch();
    this.getProfile();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1
    };
    this.isActiveSelect = null;
  }

  onSearch() {

    this.model.isActive = this.isActiveSelect;

    if (this.profileSelected != null) {
      this.model.profileId = this.profileSelected.id;
    }

    super.showLoading();
    this.service.getList(this.model).subscribe({
      next: data => {
        this.listUser = data as User[];
        super.closeLoading();
      },
      error: err => super.onError(err)
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  getProfile() {
    this.service.getProfile().subscribe({
      next: data => {
        this.listProfile = data as Profile[];
      },
      error: err => super.onError(err)
    });
  }

  remove(model) {
    this.loading.show();
    this.service.resetPassword(model).subscribe({
      next: (data) => {
        this.loading.hide();
        super.showMessage('Senha resetada com sucesso', 'Sucesso', 'success');
        this.onSearch();
      }, error: (error) => {
        super.onError(error);
      }
    });
  }

  onRemove(model) {
    const self = this;
    super.showConfirmMessage('Tem certeza que deseja resetar a senha deste usuário?', () => {
      self.remove(model);
    });
  }

  getExcel() {
    const token = localStorage.getItem('token') as string;
    let url = `${Settings.BASE_URL}/user/list-excel/?token=${token}`;
    if (this.model.userName != null)
      url += ('&user_name=' + this.model.userName);
    if (this.model.userCpf != null)
      url += ('&user_cpf=' + this.model.userCpf);
    if (this.isActiveSelect != null)
      url += ('&is_active=' + this.isActiveSelect);
    if (this.profileSelected !== null)
      url += ('&profile_id=' + this.profileSelected.id);
    window.open(url);
    console.log(url);
  }

}

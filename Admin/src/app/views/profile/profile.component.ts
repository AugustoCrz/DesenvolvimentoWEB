import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ProfileService} from "../../service/profile.service";
import {Profile} from "../../model/user/profile";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public profileService: ProfileService) {
    super(router, loading);
  }

  listProfile: Profile[] = [];
  term = '';

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading.show();
    this.profileService.list(this.term).subscribe({
      next: (data) => {
        this.listProfile = data as Profile[];
        this.loading.hide();
      }, error: (e) => {
        super.onError(e);
      }
    });
  }

  openDetails(id: string) {
    this.router.navigate(['perfil-detalhe/' + id]);
  }

  new() {
    this.router.navigate(['perfil-detalhe/']);
  }

  remove(id: string) {
    this.loading.show();
    this.profileService.delete(id).subscribe({
      next: (data) => {
        this.showMessage('Perfil removido com sucesso!');
        this.getList();
      }, error: (e) => {
        super.onError(e);
      }
    });
  }

  delete(id: string) {
    const self = this;
    super.showConfirmMessage('Tem certeza que deseja remover este perfil?', () => {
        self.remove(id);
      });
  }
}


import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {BaseComponent} from '../../base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProfileService} from '../../service/profile.service';
import {Menu, Profile} from '../../model/user/profile';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent extends BaseComponent implements OnInit {

  model: Profile = new Profile();
  selected = false;

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public route2: ActivatedRoute,
              public profileService: ProfileService) {
    super(router, loading);
  }

  ngOnInit() {
    this.route2.params.subscribe(data => {
      const resulID = data.id;
      if (resulID) {
        this.getProfile(resulID);
      } else {
        this.getNew();
      }
    });
  }

  getProfile(id: string) {
    this.loading.show();
    this.profileService.get(id).subscribe({
      next: (data) => {
        this.model = data as Profile;
        this.loading.hide();
      }, error: (e) => {
        super.onError(e);
      }
    });
  }

  getNew() {
    this.loading.show();
    this.profileService.getNew().subscribe({
      next: (data) => {
        this.model = data as Profile;
        this.loading.hide();
      }, error: (e) => {
        super.onError(e);
      }
    });
  }

  onSave() {
    for (const item of this.model.menu) {
      if (item.access && item.subMenu.length > 0) {
        let canProceed = false;

        for (const subItem of item.subMenu) {
          if (subItem.access) {
            canProceed = true;
          }
        }

        if (!canProceed) {
          this.showMessage('Ao habilitar o menu ' + item.displayName + ' é necessário dar acesso a pelo menos 1 item da lista');
          return;
        }
      }
    }

    if (isNullOrUndefined(this.model.name) || this.model.name.length === 0) {
      this.showMessage('O nome do Perfil é obrigatório!', 'Atenção', 'warning');
      return;
    }

    if (isNullOrUndefined(this.model.id) || this.model.id.length === 0) {
      this.save();
    } else {
      this.update();
    }
  }

  save() {
    // if (!this.userCanCreate('user-profile')) {
    //     this.showMessage('Você não pode cadastrar este item');
    //     return;
    // }
    this.loading.show();
    this.profileService.create(this.model).subscribe({
      next: (data) => {
        const result = data as Profile;
        this.model.id = result.id;
        this.model.createdAt = result.createdAt;
        this.loading.hide();
        super.showMessage('Cadastrado com sucesso!', 'Sucesso', 'info', () => {
        });
      }, error: (e) => {
        super.onError(e);
      }
    });
  }

  update() {
    // if (!this.userCanUpdate('user-profile')) {
    //     this.showMessage('Você não pode alterar este item');
    //     return;
    // }
    this.loading.show();
    this.profileService.update(this.model).subscribe({
      next: (data) => {
        this.loading.hide();
        const parent = this;
        super.showMessage('Alterado com sucesso!', 'Atenção', 'info', () => {
          parent.router.navigate(['/perfil']);
        });
      }, error: (e) => {
        super.onError(e);
      }
    });
  }

  selectAll(func: Menu) {
    func.create = !func.all;
    func.delete = !func.all;
    func.read = !func.all;
    func.update = !func.all;
    func.access = !func.all;
  }

}

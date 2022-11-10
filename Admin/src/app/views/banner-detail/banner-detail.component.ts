import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {News, NewsProfile} from '../../model/content/news';
import {Profile} from '../../model/user/profile';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../service/user.service';
import {Banner} from '../../model/content/banner';
import {BannersService} from '../../service/banners.service';

@Component({
  selector: 'app-banner-detail',
  templateUrl: './banner-detail.component.html',
  styleUrls: ['./banner-detail.component.scss']
})
export class BannerDetailComponent extends BaseComponent implements OnInit {

  thumpPath: string | ArrayBuffer = 'assets/images/nophoto.png';
  model: Banner = new Banner();
  listProfile: Profile[] = [];
  file: File = null;
  isFeaturedSelect: any;

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public route2: ActivatedRoute,
              public service: BannersService,
              public userService: UserService) {
    super(router, loading);
  }

  ngOnInit(): void {
    this.route2.params.subscribe(data => {
      const resulID = data.id;
      if (resulID) {
        this.model.id = resulID;
        this.get();
        this.isFeaturedSelect = null;
      }
    });
  }

  get() {
    super.showLoading();
    this.service.getNews(this.model.id).subscribe({
      next: (data) => {
        this.model = data as Banner;
        if (this.model.picturePath.length !== 0) {
          this.thumpPath = this.model.picturePath;
        }
        this.getProfile();
        super.closeLoading();
      },
      error: (error) => {
        super.onError(error);
      }
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe({
      next: data => {
        this.listProfile = data as Profile[];
        for (const p of this.listProfile) {
          p.value = (this.model.newsProfile.findIndex((v => v.profile.id === p.id)) !== -1);
        }
      },
      error: err => super.onError(err)
    });
  }

  onSave() {
    const self = this;
    super.showConfirmMessage('Tem certeza que atualizar essas informações?', () => {
      self.save();
    });
  }

  save() {
    this.model.newsProfile = [];
    for (const p of this.listProfile) {
      if (p.value) {
        const profileModel = new NewsProfile();
        profileModel.profile = p;
        this.model.newsProfile.push(profileModel);
      }
    }

    this.service.update(this.model).subscribe({
      next: (data) => {
        console.log(data['id']);
        if (this.file != null) {
          this.uploadImage(data['id']);
        } else {
          this.get();
        }
      },
      error: err => super.onError(err)
    });
  }

  handleUpload(event) {
    const files = event.srcElement.files;
    if (files.length > 0) {
      if (files[0].size > 2000000) {
        super.showMessage('Atenção',
          'A foto não deve ultrapassar o tamanho de 2MB', 'info');
        return;
      }

      if (files[0].type.indexOf('jpeg') === -1 && files[0].type.indexOf('png') === -1) {
        super.showMessage('Só será permitida fotos com extensões .jpg ou .png', 'Atenção',
          'info');
        return;
      }

    }
    const reader = new FileReader();
    reader.onload = (_event) => {
      this.thumpPath = _event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);

    this.file = files[0];
  }

  uploadImage(id) {
    this.service.uploadPicture(this.file, id).subscribe(
      data => {
        this.file = null;
        this.thumpPath = '';
        this.get();
      },
      error => super.onError(error));
  }
}

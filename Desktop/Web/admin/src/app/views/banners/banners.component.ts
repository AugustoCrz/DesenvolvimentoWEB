import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {News} from '../../model/content/news';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {NewsService} from '../../service/news.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent extends BaseComponent implements OnInit {

  thumpPath: string | ArrayBuffer = 'assets/images/nophoto.png';
  model: News = new News();
  listNews: News[] = [];

  config: any;

  isFeaturedSelect: boolean;

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public service: NewsService) {
    super(router, loading);
  }

  ngOnInit(): void {
    this.onSearch();
    this.isFeaturedSelect = null;
  }

  onSearch() {
    // if (this.model.picturePath.length !== 0) {
    //   this.thumpPath = this.model.picturePath;
    // }
    this.model.isFeatured = this.isFeaturedSelect;

    super.showLoading();
    this.service.getList(this.model).subscribe({
      next: data => {
        this.listNews = data as News[];
        super.closeLoading();
      },
      error: err => super.onError(err)
    });
  }

  onRemove(id: string) {
    const self = this;
    super.showConfirmMessage(
      'Tem certeza que deseja remover essa Notícia?', () => {
        self.remove(id);
      });
  }

  remove(id: string) {
    this.service.delete(id).subscribe({
      next: data => {
        this.onSearch();
      },
      error: err => super.onError(err)
    });
  }

}

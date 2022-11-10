import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {User} from '../../model/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent extends BaseComponent implements OnInit {

  model: User = new User();

  myType = 'AreaChart';
  arrFormatted = [
    ['Jan', 8],
    ['Fev', 5],
    ['Mar', 22],
    ['Abr', 3],
    ['Mai', 19],
  ];

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public route2: ActivatedRoute,
              public service: UserService) {
    super(router, loading);
  }

  ngOnInit(): void {
    this.route2.params.subscribe(data => {
      const resulID = data.id;
      if (resulID) {
        this.model.id = resulID;
        this.get();
      }
    });
  }


  get() {
    super.showLoading();
    this.service.getUser(this.model.id).subscribe({
      next: (data) => {
        this.model = data as User;
        super.closeLoading();
      },
      error: (error) => {
        super.onError(error);
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BaseComponent} from "../../base/base.component";
import {Filter} from "../../model/filter";
import {User} from "../../model/user/user";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {

  filter: Filter = new Filter();
  model: User = new User();
  modelEdit: User = new User();
  listUser: User[] = [];
  selectedProfile: any;
  listProfile: any;
  confirmPassword: string;

  constructor(public router: Router,
              public loading: NgxSpinnerService) {
    super(router, loading);
  }

  ngOnInit(): void {
    super.setDateRangePicker();
  }

  onSearch() {
  }

  onRemove() {
  }

  getExcel() {
  }

  onSave(modelEdit: User) {
  }

  userDetail() {
    super.onShowModal('#userDetail');
  }

  userRegister() {
    super.onShowModal('#userRegister');
  }

  create() {
  }
}

import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {Contact, Subject} from '../../model/contact';
import {Filter} from '../../model/filter';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ContactService} from '../../service/contact.service';
import {Settings} from "../../settings";
declare var $: any;
declare var moment: any;


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent extends BaseComponent implements OnInit {

  model: Contact = new Contact();
  listContact: Contact[] = [];
  listStatus: Subject[] = [];
  statusSelect: Subject;
  filter: Filter = new Filter();
  isFilter = false;

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public service: ContactService) {
    super(router, loading);
  }

  ngOnInit(): void {
    // SET DATE INIT 3 DAYS
    $('#dateInitial').val(moment().subtract(3, 'days').format('DD/MM/YYYY') + ' - ' + moment().format('DD/MM/YYYY'));

    super.setDateRangePicker();
    this.filter.beginDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDay());
    this.filter.endDate = new Date();

    this.statusSelect = null;
    this.getStatus();
  }

  onSearch() {

    const fullDateFilter = $('#dateInitialPrimary');

    const beginDateFormat = moment().subtract(3, 'days');
    const endDateFormat = moment();

    if (!this.isFilter) {
      this.filter.beginDate = beginDateFormat._d;
      this.filter.endDate = endDateFormat._d;
      fullDateFilter.val(beginDateFormat.format('DD/MM/YYYY') + ' - ' + endDateFormat.format('DD/MM/YYYY'));
    } else {
      this.filter.beginDate = super.getDateTimeZone(fullDateFilter.val().split(' - ')[0]);
      this.filter.endDate = super.getDateTimeZone(fullDateFilter.val().split(' - ')[1]);
    }

    if (this.statusSelect != null) {
      this.filter.contactStatusId = this.statusSelect.id;
    }

    super.showLoading();

    this.isFilter = true;
    super.setDateRangePicker();

    this.service.getList(this.filter).subscribe({
      next: data => {
        this.listContact = data as Contact[];
        super.closeLoading();
      },
      error: err => super.onError(err)
    });
  }

  getStatus() {
    super.showLoading();

    this.service.getStatus().subscribe(
      data => {
        this.listStatus = data as Subject[];
        super.closeLoading();
      },
      error => super.onError(error));
  }

  getExcel() {
    const token = localStorage.getItem('token') as string;
    let url = `${Settings.BASE_URL}/contact/list-excel/?token=${token}`;
    if (this.statusSelect !== null) {
      url += ('&ProfileId=' + this.statusSelect.id);
    }
    url += ('&BeginDate=' + this.filter.beginDate.toISOString().split('T')[0]);
    url += ('&EndDate=' + this.filter.endDate.toISOString().split('T')[0]);
    window.open(url);
  }
}

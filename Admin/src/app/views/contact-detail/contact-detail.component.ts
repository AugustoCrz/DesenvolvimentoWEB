import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {Contact, Subject} from '../../model/contact';
import {Filter} from '../../model/filter';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ContactService} from '../../service/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent extends BaseComponent implements OnInit {

  model: Contact = new Contact();
  modelSubject: Subject = new Subject();
  listContact: Contact[] = [];
  filter: Filter = new Filter();

  constructor(public router: Router,
              public loading: NgxSpinnerService,
              public route2: ActivatedRoute,
              public service: ContactService) {
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
    this.service.get(this.model.id).subscribe({
      next: (data) => {
        this.model = data as Contact;
        super.closeLoading();
      },
      error: (error) => {
        super.onError(error);
      }
    });
  }

  answer() {
    super.showLoading();
    this.model.contactStatus = this.modelSubject.isStatus();

    // console.log(this.model);
    this.service.contact(this.model).subscribe({
      next: (data) => {
        this.get();
        super.closeLoading();
      }, error: (error) => {
        super.onError(error);
      }
    });
  }

}

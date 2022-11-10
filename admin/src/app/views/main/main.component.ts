import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleBody() {
    $('body').toggleClass('sidebar-toggled');
    $('.sidebar').toggleClass('toggled');
    if ($('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('show');
    }
    $('#logo').toggleClass('logo');
    $('#content-wrapper').toggleClass('body-menu-toggle');
    $('#top-bar').toggleClass('body-menu-toggle');
  }

}

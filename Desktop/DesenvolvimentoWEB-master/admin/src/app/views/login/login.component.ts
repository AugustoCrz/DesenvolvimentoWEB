import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validTemplate: boolean;
  section = 0;

  constructor() {
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login');
    body.classList.add('background-login');
  }

  onLogin() {
  }

  onForgot(email: string) {
  }

  nextSection(_section) {
    if (_section < this.section) {
      this.section = _section;
      return;
    }

    switch (_section) {
      case true:
        if (true) {
          this.validTemplate = true;
          return;
        }
      case 1:
        if (this.forgotPassword()) {
          this.section = _section;
        }
        break;
      case 2:
        if (this.register()) {
          this.section = _section;
        }
        break;
    }
  }

  forgotPassword(): boolean {
    return true;
  }

  register(): boolean {
    return true;
  }
}

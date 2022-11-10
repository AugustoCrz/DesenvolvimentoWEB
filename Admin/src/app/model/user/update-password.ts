export class UpdatePassword {
  actualPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor() {
    this.actualPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }
}

import {User} from "./user/user";

export class Contact {

  id: string;
  name: string;
  email: string;
  phone1: string;
  phone2: string;
  message: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  userAdmin: User;
  subject: Subject;
  contactStatus: Subject;

  constructor() {
    this.contactStatus = new Subject();
    this.subject = new Subject();
    this.user = new User();
  }
}

export class Subject {

  id: string;
  name: string;

  constructor() {
  }

  isStatus() {
    const s = new Subject();
    s.id = '41cf691c-9c0d-44f3-a9c7-b00a533f98d5';
    s.name = 'Respondido';
    return s;
  };
}

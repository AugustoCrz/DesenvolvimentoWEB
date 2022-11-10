import {Profile} from "./profile";

export class User {

  id: string;
  name: string;
  rg: string;
  cpf: string;
  birthday: string;
  email: string;
  phone: string;
  cep: number;
  address: string;
  number: number;
  city: number;
  district: number;
  complement: number;
  password: string;
  token: string;
  createdAt: string;
  updateAt: string;
  confirmNewPassword: string;
  profile: Profile;
  isActive: boolean;

  userName: string;
  userEmail: string;
  userCpf: string;
  profileId: string;


  constructor() {
    this.profile = new Profile();
  }

}

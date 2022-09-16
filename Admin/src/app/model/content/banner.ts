import {Profile} from '../user/profile';

export class Banner {

  id: string;
  title: string;
  text: string;
  picturePath: string;
  isActive: boolean = null;
  isFeatured: boolean;
  createdAt: string;
  orden: string;
  userName: string;
  newsProfile: NewsProfile[];

  constructor() {
  }
}

export class NewsProfile {

  profile: Profile;

  constructor(){
  }
}

import {Profile} from '../user/profile';

export class News {

  id: string;
  title: string;
  text: string;
  picturePath: string;
  isActive: boolean = null;
  isFeatured: boolean;
  createdAt: string;
  viewsQtd: string;
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {MainComponent} from './views/main/main.component';
import {HomeComponent} from './views/home/home.component';
import {UserComponent} from './views/user/user.component';
import {ContactUsComponent} from './views/contact-us/contact-us.component';
import {ContactDetailComponent} from './views/contact-detail/contact-detail.component';
import {ProfileComponent} from './views/profile/profile.component';
import {ProfileDetailComponent} from './views/profile-detail/profile-detail.component';
import {ClientsComponent} from './views/clients/clients.component';
import {ClientDetailComponent} from "./views/client-detail/client-detail.component";
import {NewsComponent} from "./views/news/news.component";
import {NewsDetailComponent} from "./views/news-detail/news-detail.component";
import {BannersComponent} from "./views/banners/banners.component";
import {BannerDetailComponent} from "./views/banner-detail/banner-detail.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'usuarios-admin', component: UserComponent},
      {path: 'fale-conosco', component: ContactUsComponent},
      {path: 'fale-conosco-detalhe/:id', component: ContactDetailComponent},
      {path: 'perfil', component: ProfileComponent},
      {path: 'perfil-detalhe/:id', component: ProfileDetailComponent},
      {path: 'clientes', component: ClientsComponent},
      {path: 'cliente-detalhe/:id', component: ClientDetailComponent},
      {path: 'noticias', component: NewsComponent},
      {path: 'noticia-detalhe/:id', component: NewsDetailComponent},
      {path: 'banners', component: BannersComponent},
      {path: 'banner-detalhe/:id', component: BannerDetailComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

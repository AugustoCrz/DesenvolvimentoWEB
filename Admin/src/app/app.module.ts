// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { UserComponent } from './views/user/user.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import {ContactService} from "./service/contact.service";
import { ContactDetailComponent } from './views/contact-detail/contact-detail.component';
import { ProfileComponent } from './views/profile/profile.component';
import {ProfileService} from "./service/profile.service";
import { ProfileDetailComponent } from './views/profile-detail/profile-detail.component';
import { ClientsComponent } from './views/clients/clients.component';
import {UserService} from "./service/user.service";
import { ClientDetailComponent } from './views/client-detail/client-detail.component';
import {GoogleChartsModule} from "angular-google-charts";
import { NewsComponent } from './views/news/news.component';
import { NewsDetailComponent } from './views/news-detail/news-detail.component';
import {NewsService} from "./service/news.service";
import {AngularEditorModule} from "@kolkov/angular-editor";
import { BannersComponent } from './views/banners/banners.component';
import { BannerDetailComponent } from './views/banner-detail/banner-detail.component';
import {BannersService} from "./service/banners.service";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    ContactUsComponent,
    ContactDetailComponent,
    ProfileComponent,
    ProfileDetailComponent,
    ClientsComponent,
    ClientDetailComponent,
    NewsComponent,
    NewsDetailComponent,
    BannersComponent,
    BannerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule.forRoot(),
    AngularEditorModule
  ],
  providers: [
    ContactService,
    ProfileService,
    UserService,
    NewsService,
    BannersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

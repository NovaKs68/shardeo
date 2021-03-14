import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestCreateMediaComponent } from './components/test-create-media/test-create-media.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { PopularComponent } from './pages/main-navigation/popular/popular.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GridMediaComponent } from './components/grid-media/grid-media.component';
import { MainNavigationComponent } from './pages/main-navigation/main-navigation.component';
import { NewsFeedComponent } from './pages/main-navigation/news-feed/news-feed.component';
import { InspirationComponent } from './pages/main-navigation/inspiration/inspiration.component';
import { CreatorsComponent } from './pages/main-navigation/creators/creators.component';
import { GridInspirationComponent } from './components/grid-inspiration/grid-inspiration.component';
import { GridCreatorsComponent } from './components/grid-creators/grid-creators.component';
import { MyPortfolioComponent } from './pages/main-navigation/my-portfolio/my-portfolio.component';
import { CreatorBannerComponent } from './components/creator-banner/creator-banner.component';
import { ConnectionComponent } from './pages/main-navigation/connection/connection.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoaderSpinComponent } from './components/loader-spin/loader-spin.component';
import { MyProfileComponent } from './pages/main-navigation/my-profile/my-profile.component';
import { FormProfileComponent } from './components/form-profile/form-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TestCreateMediaComponent,
    PopularComponent,
    HeaderComponent,
    SearchBarComponent,
    GridMediaComponent,
    MainNavigationComponent,
    NewsFeedComponent,
    InspirationComponent,
    CreatorsComponent,
    GridInspirationComponent,
    GridCreatorsComponent,
    MyPortfolioComponent,
    CreatorBannerComponent,
    ConnectionComponent,
    SigninComponent,
    SignupComponent,
    LoaderSpinComponent,
    MyProfileComponent,
    FormProfileComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCreateMediaComponent } from './components/test-create-media/test-create-media.component';
import { MainNavigationComponent } from "./pages/main-navigation/main-navigation.component";
import { PopularComponent } from "./pages/main-navigation/popular/popular.component";
import { NewsFeedComponent } from "./pages/main-navigation/news-feed/news-feed.component";
import { InspirationComponent } from "./pages/main-navigation/inspiration/inspiration.component";
import { CreatorsComponent } from "./pages/main-navigation/creators/creators.component";
import { MyPortfolioComponent } from "./pages/main-navigation/my-portfolio/my-portfolio.component";
import { ConnectionComponent } from "./pages/main-navigation/connection/connection.component";
import {MyProfileComponent} from "./pages/main-navigation/my-profile/my-profile.component";
import {AuthUserGuardService} from "./services/auth-user-guard.service";

const routes: Routes = [
  { path : '', component: MainNavigationComponent,
    children: [
      { path: 'popular', component: PopularComponent },
      { path: 'news', component: NewsFeedComponent },
      { path: 'inspiration', component: InspirationComponent },
      { path: 'creator', component: CreatorsComponent },
      { path: 'myPortfolio', component: MyPortfolioComponent, canActivate: [AuthUserGuardService] },
      { path: 'connection', component: ConnectionComponent },
      { path: 'myProfile', component: MyProfileComponent, canActivate: [AuthUserGuardService] }
    ]
  },
  { path : 'test', component: TestCreateMediaComponent, canActivate: [AuthUserGuardService] },
  { path: '', pathMatch: 'full', component: ConnectionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

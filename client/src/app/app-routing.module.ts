import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCreateMediaComponent } from './components/test-create-media/test-create-media.component';
import { MainNavigationComponent } from "./pages/main-navigation/main-navigation.component";

const routes: Routes = [
  { path : '', component: MainNavigationComponent },
  { path : 'test', component: TestCreateMediaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

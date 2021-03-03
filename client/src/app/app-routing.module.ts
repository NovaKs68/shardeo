import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCreateMediaComponent } from './components/test-create-media/test-create-media.component';
import { PopularComponent } from './pages/popular/popular.component';

const routes: Routes = [
  { path : '', component: PopularComponent },
  { path : 'test', component: TestCreateMediaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

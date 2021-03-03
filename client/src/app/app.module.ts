import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestCreateMediaComponent } from './components/test-create-media/test-create-media.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { PopularComponent } from './pages/popular/popular.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GridMediaComponent } from './components/grid-media/grid-media.component';

@NgModule({
  declarations: [
    AppComponent,
    TestCreateMediaComponent,
    PopularComponent,
    HeaderComponent,
    SearchBarComponent,
    GridMediaComponent
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

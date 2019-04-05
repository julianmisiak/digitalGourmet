import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MaterializeModule, MzInputModule, MzValidationModule} from 'ngx-materialize';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LocalStorageService} from '../utils/local-storage.service';
import {HttpHeaderService} from '../utils/http-header.service';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    MzInputModule,
    MzValidationModule
  ],
  exports: [
    MzInputModule,
    MzValidationModule,
  ],
    providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy }, LocalStorageService, HttpHeaderService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

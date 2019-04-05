import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MzInputModule, MzValidationModule} from 'ngx-materialize';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LocalStorageService} from '../utils/local-storage.service';
import {HttpHeaderService} from '../utils/http-header.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from './environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AutenticationGuardService} from './services/autentication-guard.service';

const appRoutes: Routes = [
  {path: '', component: LoginComponent, canActivate : [AutenticationGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'appComponent', component: AppComponent, canActivate : [AutenticationGuardService]}
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
    MzValidationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule
  ],
  exports: [
    MzInputModule,
    MzValidationModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, LocalStorageService, HttpHeaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

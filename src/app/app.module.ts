import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {
  MzButtonModule,
  MzCardModule,
  MzCheckboxModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule,
  MzMediaModule,
  MzModalModule,
  MzNavbarModule,
  MzSelectModule,
  MzSidenavModule,
  MzSwitchModule,
  MzTabModule,
  MzToastModule,
  MzValidationModule
} from 'ngx-materialize';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {LocalStorageService} from '../utils/local-storage.service';
import {HttpHeaderService} from '../utils/http-header.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from './environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AutenticationGuardService} from './services/autentication-guard.service';
import {NavBarComponent} from './navigation/nav-bar/nav-bar.component';
import {HomeComponent} from './components/home/home.component';
import {UserComponent} from './components/user/user.component';
import {UserInternalCrudComponent} from './components/user/user-internal-crud/user-internal-crud.component';
import {CrudComponent} from './components/crud/crud.component';
import {FilterPipe} from './pipes/filter.pipe';
import {SideNavComponent} from './navigation/side-nav/side-nav.component';
import {UserGeneraldataTabComponent} from './components/user/user-internal-crud/user-generaldata-tab/user-generaldata-tab.component';
import {UserAddressTabComponent} from './components/user/user-internal-crud/user-address-tab/user-address-tab.component';
import {InternalCrudComponent} from './components/crud/internal-crud/internal-crud.component';
import {UserRoleTabComponent} from './components/user/user-internal-crud/user-role-tab/user-role-tab.component';
import {RoleComponent} from './components/role/role.component';
import {RoleInternalCrudComponent} from './components/role/role-internal-crud/role-internal-crud.component';
import {AngularDualListBoxModule} from 'angular-dual-listbox';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate : [AutenticationGuardService]},
  {path: 'home', component: HomeComponent, canActivate : [AutenticationGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'appComponent', component: AppComponent, canActivate : [AutenticationGuardService]},
  {path: 'user', component: UserComponent, canActivate : [AutenticationGuardService]},
  {path: 'role', component: RoleComponent, canActivate : [AutenticationGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    UserComponent,
    UserInternalCrudComponent,
    CrudComponent,
    FilterPipe,
    SideNavComponent,
    UserGeneraldataTabComponent,
    UserAddressTabComponent,
    InternalCrudComponent,
    UserRoleTabComponent,
    RoleComponent,
    RoleInternalCrudComponent
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
    MzModalModule,
    MzButtonModule,
    MzToastModule,
    MzNavbarModule,
    MzCardModule,
    MzCheckboxModule,
    MzSidenavModule,
    MzMediaModule,
    MzSelectModule,
    MzTabModule,
    MzIconModule,
    MzIconMdiModule,
    MzSwitchModule,
    AngularDualListBoxModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule
  ],
  exports: [
    MzInputModule,
    MzValidationModule,
    UserInternalCrudComponent,
    RoleInternalCrudComponent

  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy}, LocalStorageService, HttpHeaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [UserInternalCrudComponent, RoleInternalCrudComponent],
})
export class AppModule {
}

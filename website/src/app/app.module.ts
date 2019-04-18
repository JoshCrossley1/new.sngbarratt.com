import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AuthService } from './services/auth.service';

export function jwtOptionsFactory() {
    let auth: AuthService;
    return {
        tokenGetter: () => {            
            return 'access_token'
        },
        getAuth: () => {
            //return auth.getAsyncToken();
        }
    }    
}

//import { HttpInterceptorService } from './services/http-interceptor.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAccountComponent } from './header/header-account/header-account.component';
import { HeaderLogoComponent } from './header/header-logo/header-logo.component';
import { HeaderGlobalSettingsComponent } from './header/header-global-settings/header-global-settings.component';
import { LanguageSwitchComponent } from './header/header-global-settings/language-switch/language-switch.component';
import { BranchSwitchComponent } from './header/header-global-settings/branch-switch/branch-switch.component';
import { HeaderBasketComponent } from './header/header-basket/header-basket.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { GenericSearchComponent } from './generic-search/generic-search.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'not-found', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    HeaderAccountComponent,
    HeaderLogoComponent,
    HeaderGlobalSettingsComponent,
    LanguageSwitchComponent,
    BranchSwitchComponent,
    HeaderBasketComponent,
    NavbarComponent,
    GenericSearchComponent,
    ModalLoginComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      JwtModule.forRoot({
          jwtOptionsProvider: {
              provide: JWT_OPTIONS,
              useFactory: jwtOptionsFactory
          }
      }),
      RouterModule.forRoot(appRoutes),
      ReactiveFormsModule,
      NgbModalModule
  ],
  entryComponents: [
      LoginComponent,
      NotFoundComponent,
      ModalLoginComponent
  ],
  providers: [
      //{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/http-config-interceptor';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

//import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';

import { Customer } from './classes/customer';
import { Basket } from './classes/basket';

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
import { BasketComponent } from './basket/basket.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductSearchComponent } from './header/navbar/product-search/product-search.component';
import { ProductComponent } from './product/product.component';
import { PartResultComponent } from './part-result/part-result.component';
import { EatClickIfDirective } from './directives/eat-click-if.directive';
import { SngTranslateDirective } from './directives/sng-translate.directive';
import { StockStatusComponent } from './part-result/stock-status/stock-status.component';
import { PartTypeComponent } from './part-result/part-type/part-type.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'basket', component: BasketComponent },
    { path: '**', component: NotFoundComponent }
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
    ModalLoginComponent,
    BasketComponent,
    HomepageComponent,
    ProductSearchComponent,
    ProductComponent,
    PartResultComponent,
    EatClickIfDirective,
    SngTranslateDirective,
    StockStatusComponent,
    PartTypeComponent    
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
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
      AuthService,        
      Customer,
      Basket,
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

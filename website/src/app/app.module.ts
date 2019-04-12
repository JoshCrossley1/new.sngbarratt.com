import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAccountComponent } from './header/header-account/header-account.component';
import { HeaderLogoComponent } from './header/header-logo/header-logo.component';
import { HeaderGlobalSettingsComponent } from './header/header-global-settings/header-global-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    HeaderAccountComponent,
    HeaderLogoComponent,
    HeaderGlobalSettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { CreateComponent } from './authentication/create/create.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { AdminComponent } from './authentication/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TokenInterceptor } from './authentication/token/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateComponent,
    ProfileComponent,
    AdminComponent,
    DashboardComponent,
    PageFooterComponent,
    PageHeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

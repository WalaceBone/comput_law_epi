import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeModule } from './modules/home/home.module';

// Providers
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';

import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ChartsModule} from 'ng2-charts';
import { MenuModule } from './modules/menu/menu.module';
import { RulesModule } from './modules/rules/rules.module';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { ProfileModule } from './modules/profile/profile.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    MenuModule,
    RulesModule,
    QuestionnaireModule,
    ProfileModule,
    HomeModule
  ],
  providers: [CookieService, { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }


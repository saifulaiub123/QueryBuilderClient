import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './common/components/nav-bar/nav-bar.component';
import { TableService} from './services/table.service'
import { FormsModule } from '@angular/forms';
import { QueryBuilderModule } from './query-builder/query-builder.module';
import {InputTextModule} from 'primeng/inputtext';




 registerLocaleData(localeFr);
@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    QueryBuilderModule,
    InputTextModule,
  ],
  providers: [MessageService,TableService,ConfirmationService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

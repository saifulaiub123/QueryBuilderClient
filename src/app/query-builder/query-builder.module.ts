import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { QueryBuilderRoutingModule } from './query-builder-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';


import {
  ButtonModule,
  CalendarModule,
  ChartModule,
  CheckboxModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  DynamicDialogModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  MessageModule,
  MultiSelectModule,
  PickListModule,
  SidebarModule,
  SplitButtonModule,
  TableModule,
  TabViewModule,
  TreeModule,

} from 'primeng';
import { RequeteurComponent } from './requeteur/requeteur.component';
import { ListRequeteurComponent } from './list-requeteur/list-requeteur.component';
import { DynamicQueryBuilderComponent } from './dynamic-query-builder/dynamic-query-builder.component';
import { DynamicBuilderComponent } from './dynamic-builder/dynamic-builder.component';

@NgModule({
  declarations: [RequeteurComponent, ListRequeteurComponent, DynamicQueryBuilderComponent, DynamicBuilderComponent],
  imports: [
    CommonModule,
    QueryBuilderRoutingModule,
    TableModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    ConfirmDialogModule,
    CalendarModule,
    MultiSelectModule,
    InputSwitchModule,
    ChartModule,
    TreeModule,
    PickListModule,
    CheckboxModule,
    SplitButtonModule,
    DialogModule,
    TooltipModule,
    SidebarModule,
    MessagesModule,
    DynamicDialogModule

  ],
})
export class QueryBuilderModule { }

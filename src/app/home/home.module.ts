import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { ListComponent } from '../list/list.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    SearchbarComponent
],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
      HomeComponent,
      ListComponent,
      SearchbarComponent
  ]
})
export class HomeModule { }

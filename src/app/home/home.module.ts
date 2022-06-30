import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import {
  VideoListComponent,
  SearchbarComponent,
  VideoListItemComponent,
  VideoDialogComponent,
  VideoPageComponent
} from './index';
import { MaterialModule } from './material-module/material.module';

const components = [
  HomeComponent,
  VideoListComponent,
  SearchbarComponent,
  VideoListItemComponent,
  VideoDialogComponent,
  VideoPageComponent
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [...components],
})
export class HomeModule {}

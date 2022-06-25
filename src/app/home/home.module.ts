import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { VideoListComponent, SearchbarComponent, VideoListItemComponent, VideoDialogComponent } from './index';
import { MaterialModule } from './material-module/material.module';

const components = [HomeComponent, VideoListComponent, SearchbarComponent, VideoListItemComponent, VideoDialogComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [...components,],
})
export class HomeModule {}

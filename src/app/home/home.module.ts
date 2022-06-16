import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { VideoListComponent, SearchbarComponent, VideoListItemComponent } from './index';

const components = [HomeComponent, VideoListComponent, SearchbarComponent, VideoListItemComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [...components],
})
export class HomeModule {}

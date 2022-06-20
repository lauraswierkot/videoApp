import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { VideoListComponent, SearchbarComponent, VideoListItemComponent } from './index';
import { MatCardModule } from '@angular/material/card';

const components = [HomeComponent, VideoListComponent, SearchbarComponent, VideoListItemComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatCardModule],
  exports: [...components],
})
export class HomeModule {}

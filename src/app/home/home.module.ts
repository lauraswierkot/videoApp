import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { VideoListComponent, SearchbarComponent } from './index';

const components = [HomeComponent, VideoListComponent, SearchbarComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [...components],
})
export class HomeModule {}

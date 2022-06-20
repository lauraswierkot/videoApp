import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService, VideoService } from '.';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [HttpService, VideoService],
})
export class CoreModule {}

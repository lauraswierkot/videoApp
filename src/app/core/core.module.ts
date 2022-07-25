import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService, VideoService, FacadeService } from '.';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [HttpService, VideoService, FacadeService],
})
export class CoreModule {}

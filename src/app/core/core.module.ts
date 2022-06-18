import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService, YoutubeService, VimeoService } from '.';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [HttpService, YoutubeService, VimeoService]
})
export class CoreModule { }

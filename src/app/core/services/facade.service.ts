import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  public videoList$ = this.videoService.videosList$;

  constructor(private videoService: VideoService) {}

  public getVideo(id: string): void {
    this.videoService.getVideo(id);
  }

  public deleteVideo(id: string): void {
    return this.videoService.deleteVideo(id);
  }

  public setAsFavorite(id: string): void {
    return this.videoService.setAsFavorite(id);
  }

  public getVideoIdForPlayer(url: string) {
    return this.videoService.getVideoDataForPlayer(url);
  }
}

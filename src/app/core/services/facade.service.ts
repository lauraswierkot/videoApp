import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from '../model/video';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private _videoService: VideoService;
  public get videoService(): VideoService {
    if (!this._videoService) {
      this._videoService = this.injector.get(VideoService);
    }
    return this._videoService;
  }

  constructor(private injector: Injector) {}

  public getVideo(id: string): void {
    this.videoService.getVideo(id);
  }

  public getVideosList(): Subject<Video[]> {
    return this.videoService.getVideosList();
  }

  public deleteVideo(id: string): void {
    return this.videoService.deleteVideo(id);
  }

  public setAsFavorite(id: string): void {
    return this.videoService.setAsFavorite(id);
  }
}

import { Injectable } from '@angular/core';
import { Video } from '../model/video';
import { VideoPlayer } from '../model/video-player';

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

  public deleteAll(): void {
    return this.videoService.deleteAll();
  }

  public getDemoVideos(): void {
    return this.videoService.getDemoVideos();
  }

  public getVideoIdForPlayer(url: string): VideoPlayer {
    return this.videoService.getVideoDataForPlayer(url);
  }

  public getVideoById(id: string): Video {
    return this.videoService.getVideoById(id);
  }
}

import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from '../model/video';
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
}

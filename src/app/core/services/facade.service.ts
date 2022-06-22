import { Injectable, Injector } from '@angular/core';
import { HttpService } from './http.service';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  public videoList$ = this.videoService.videosList$;
  
  constructor(private videoService: VideoService, private httpService: HttpService) {}

  public getVideo(id: string): void {
    this.videoService.getVideo(id);
  }

  public deleteVideo(id: string): void {
    return this.videoService.deleteVideo(id);
  }

  public setAsFavorite(id: string): void {
    return this.videoService.setAsFavorite(id);
  }

  public getYoutubeVideoId(id: string): string {
    return this.httpService.getYoutubeVideoId(id);
  }
}

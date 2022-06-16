import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from './core/video';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  video: Subject<Video> = new Subject<Video>();

  public shareItem(item: Video): void {
    this.video.next(item); 
  }

  public getVideos(): Subject<Video> {
    return this.video;
  }
}

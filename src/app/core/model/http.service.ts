import { Injectable } from '@angular/core';

import { Video } from './video';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { YoutubeService } from './youtube.service';
import { VimeoService } from './vimeo.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private youtubeService: YoutubeService,
    vimeoService: VimeoService
  ) {}

  public videosList$: Subject<Video[]> = new BehaviorSubject<Video[]>([]);
  public video$: Subject<Video> = new Subject<Video>();
  public videos: Video[] = [];

  public getVideo(id: string): void {
    let videoObservable$: Observable<Video> = new Observable<Video>();
    if (id != 'yt') {
      //conditions to be changed
      videoObservable$ = this.youtubeService.getVideo(id);
    } else {
      //vimeo method to be added
      videoObservable$ = this.youtubeService.getVideo(id);
    }
    videoObservable$.subscribe((value: Video) => {
      this.saveVideo(value);
    });
  }

  public saveVideo(item: Video): void {
    this.videos = this.getFromLocalStorage();
    this.videos.push(item);
    this.setInLocalStorage(this.videos);
    this.videosList$.next(this.videos);
    this.video$.next(item);
  }

  public getVideosList(): Subject<Video[]> {
    this.videos = this.getFromLocalStorage();
    this.videosList$.next(this.videos);
    return this.videosList$;
  }

  public deleteVideo(id: string): void {
    this.videos = this.getFromLocalStorage();
    this.videos = this.videos.filter((value) => value.id != id);
    this.setInLocalStorage(this.videos);
    this.videosList$.next(this.videos);
  }

  private getFromLocalStorage(): Video[] {
    const stringVideosInLs = localStorage.getItem('Video List');
    if (stringVideosInLs != undefined) {
      return JSON.parse(stringVideosInLs);
    }
    return [];
  }

  private setInLocalStorage(videos: Video[]): void {
    localStorage.setItem('Video List', JSON.stringify(videos));
  }
}

import { Injectable } from '@angular/core';

import { Video } from '../model/video';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class VideoService {
  public videosList$: Subject<Video[]> = new BehaviorSubject<Video[]>([]);
  public video$: Subject<Video> = new Subject<Video>();
  public videos: Video[] = [];
  private localStorageList = 'Video List';

  constructor(private httpService: HttpService) {}

  public getVideo(id: string): void {
    let videoObservable$: Observable<Video>;
    if (id.length == 11 || id.includes('you')) {
      videoObservable$ = this.httpService.getYoutubeVideo(id);
    } else {
      videoObservable$ = this.httpService.getVimeoVideo(id);
    }
    videoObservable$.pipe(untilDestroyed(this)).subscribe((value: Video) => {
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
    this.videos = this.videos.filter((value) => value.id !== id);
    this.setInLocalStorage(this.videos);
    this.videosList$.next(this.videos);
  }

  private getFromLocalStorage(): Video[] {
    const storedVideos = localStorage.getItem(this.localStorageList);
    if (storedVideos != undefined) {
      return JSON.parse(storedVideos);
    }
    return [];
  }

  private setInLocalStorage(videos: Video[]): void {
    localStorage.setItem(this.localStorageList, JSON.stringify(videos));
  }
}

import { Injectable } from '@angular/core';

import { Video } from '../model/video';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { HttpService } from './http.service';

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
    const ytIdDigitsLength: number = 11;
    if (id.length == ytIdDigitsLength || id.includes('you')) {
      videoObservable$ = this.httpService.getYoutubeVideo(id);
    } else {
      videoObservable$ = this.httpService.getVimeoVideo(id);
    }
    videoObservable$.pipe(take(1)).subscribe((value: Video) => {
      this.saveVideo(value);
    });
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

  public setAsFavorite(id: string): void {
    this.videos = this.getFromLocalStorage();
    this.videos.filter((value) => value.id === id)[0].isFavorite = true;
    this.setInLocalStorage(this.videos);
    this.videosList$.next(this.videos);
  }

  private saveVideo(item: Video): void {
    this.videos = this.getFromLocalStorage();
    this.videos.push(item);
    this.setInLocalStorage(this.videos);
    this.videosList$.next(this.videos);
    this.video$.next(item);
  }

  private getFromLocalStorage(): Video[] {
    const storedVideos = localStorage.getItem(this.localStorageList);
    if (storedVideos !== null) {
      return JSON.parse(storedVideos);
    }
    return [];
  }

  private setInLocalStorage(videos: Video[]): void {
    localStorage.setItem(this.localStorageList, JSON.stringify(videos));
  }
}

import { Injectable } from '@angular/core';

import { Video } from '../model/video';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { HttpService } from './http.service';
import { getVideoId } from '../utils/video-helper';
import { VideoType } from '../utils/video-type';
import { VideoPlayer } from '../model/video-player';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  public _videosList$: Subject<Video[]> = new BehaviorSubject<Video[]>([]);
  public video$: Subject<Video> = new Subject<Video>();
  public videos: Video[] = [];

  private localStorageList = 'Video List';

  constructor(private httpService: HttpService) {}

  public get videosList$() {
    this.videos = this.getFromLocalStorage();
    this._videosList$.next(this.videos);
    return this._videosList$;
  }

  public getVideo(id: string): void {
    let videoObservable$: Observable<Video>;
    const result = getVideoId(id);
    if (result.videoType === VideoType.YOUTUBE) {
      videoObservable$ = this.httpService.getYoutubeVideo(result.id);
    } else {
      videoObservable$ = this.httpService.getVimeoVideo(result.id);
    }
    videoObservable$.pipe(take(1)).subscribe((value: Video) => {
      this.saveVideo(value);
    });
  }

  public getVideoDataForPlayer(url: string): VideoPlayer {
    return getVideoId(url);
  }

  public deleteVideo(id: string): void {
    this.videos = this.getFromLocalStorage();
    this.videos = this.videos.filter((value) => value.id !== id);
    this.setInLocalStorage(this.videos);
    this._videosList$.next(this.videos);
  }

  public setAsFavorite(id: string): void {
    this.videos = this.getFromLocalStorage();
    this.videos.filter((value) => value.id === id)[0].isFavorite = true;
    this.setInLocalStorage(this.videos);
    this._videosList$.next(this.videos);
  }

  public deleteAll(): void {
    this.videos = [];
    this.setInLocalStorage(this.videos);
    this._videosList$.next(this.videos);
  }

  public getDemoVideos(): void {
    const videos: string[] = ['eIAEy5aOb9g','zN6zF8AaDA4','BwknA6aGqvs'];
    videos.forEach((element) => {
      this.getVideo(element);
    });
  }

  private saveVideo(item: Video): void {
    this.videos = this.getFromLocalStorage();
    this.videos.push(item);
    this.setInLocalStorage(this.videos);
    this._videosList$.next(this.videos);
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

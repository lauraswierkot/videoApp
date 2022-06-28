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
  public _favoritesVideosList$: Subject<Video[]> = new BehaviorSubject<Video[]>([]);
  public video$: Subject<Video> = new Subject<Video>();
  public videos: Video[] = [];
  
  public favoriteVideos: Video[] = [];

  private localStorageList: string= 'Video List';
  private localStorageListFavorites: string = 'Favorites List';

  constructor(private httpService: HttpService) {}

  public get videosList$() {
    this.videos = this.getFromLocalStorage(this.localStorageList);
    this._videosList$.next(this.videos);
    return this._videosList$;
  }

  public get favoritesVideosList$() {
    this.favoriteVideos = this.getFromLocalStorage(this.localStorageListFavorites);
    this._favoritesVideosList$.next(this.favoriteVideos);
    return this._favoritesVideosList$;
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
    this.videos = this.getFromLocalStorage(this.localStorageList);
    this.favoriteVideos = this.getFromLocalStorage(this.localStorageListFavorites);
    this.videos = this.videos.filter((value) => value.id !== id);
    this.favoriteVideos = this.favoriteVideos.filter((value) => value.id !== id);
    this.setInLocalStorage(this.videos, this.localStorageList);
    this.setInLocalStorage(this.favoriteVideos, this.localStorageListFavorites);
    this._videosList$.next(this.videos);
    this._favoritesVideosList$.next(this.favoriteVideos);
  }
  
  public setAsFavorite(id: string): void {
    this.videos = this.getFromLocalStorage(this.localStorageList);
    if(this.favoriteVideos.findIndex((item)=>item.id===id) == -1)
    {
      this.videos.filter((value) => value.id === id)[0].isFavorite = true;
      this.favoriteVideos.push(this.videos.filter((value) => value.id === id)[0]);
    }
    else {
      this.videos.filter((value) => value.id === id)[0].isFavorite = false;
      this.favoriteVideos = this.favoriteVideos.filter((item)=>item.id !== id);
    }
    this.setInLocalStorage(this.favoriteVideos, this.localStorageListFavorites);
    this.setInLocalStorage(this.videos, this.localStorageList);
    this._favoritesVideosList$.next(this.favoriteVideos);
    this._videosList$.next(this.videos);
  }

  public deleteAll(): void {
    this.videos = [];
    this.favoriteVideos = [];
    this.setInLocalStorage(this.videos, this.localStorageList);
    this.setInLocalStorage(this.favoriteVideos, this.localStorageListFavorites);
    this._videosList$.next(this.videos);
    this._favoritesVideosList$.next(this.favoriteVideos);
  }

  public getDemoVideos(): void {
    const videos: string[] = ['eIAEy5aOb9g','zN6zF8AaDA4','BwknA6aGqvs'];
    videos.forEach((element) => {
      this.getVideo(element);
    });
  }

  private saveVideo(item: Video): void {
    this.videos = this.getFromLocalStorage(this.localStorageList);
    this.videos.push(item);
    this.setInLocalStorage(this.videos, this.localStorageList);
    this._videosList$.next(this.videos);
    this.video$.next(item);
  }

  private getFromLocalStorage(key: string): Video[] {
    const storedVideos = localStorage.getItem(key);
    if (storedVideos !== null) {
      return JSON.parse(storedVideos);
    }
    return [];
  }

  private setInLocalStorage(videos: Video[], key: string): void {
    localStorage.setItem(key, JSON.stringify(videos));
  }
}

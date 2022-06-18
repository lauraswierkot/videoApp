import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from './video';
import { Subject } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private apiURL: string = environment.ytURL;
  private apiKey: string = environment.ytKey;

  public videosList$: Subject<Video[]> = new Subject<Video[]>();
  public video$: Subject<Video> = new Subject<Video>();
  public videos: Video[] = [];

  public getYoutubeVideoID = (url: string) => {
    const regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return url.replace(regex, `$1`);
  };

  public getVideo(id: string): Observable <any> {
    this.getYoutubeVideoID(id);
    const url = `${this.apiURL}?q=v=${id}&key=${this.apiKey}&part=snippet&type=video&maxResults=10`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response)
      );
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
    this.videos = this.videos.filter(value => value.id != id);
    this.setInLocalStorage(this.videos);
    this.videosList$.next(this.videos);
  }

  private getFromLocalStorage(): Video[] {
    const stringVideosInLs = localStorage.getItem("Video List");
    if(stringVideosInLs != undefined) {
      return JSON.parse(stringVideosInLs);
    }
    return [];
  }

  private setInLocalStorage(videos: Video[]): void {
    localStorage.setItem("Video List", JSON.stringify(videos));
  }
}

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

  private apiURL: string = environment.apiURL;
  private apiKey: string = environment.apiKey;

  public videosList$: Subject<Video[]> = new Subject<Video[]>();
  public video$: Subject<Video> = new Subject<Video>();
  public videos: Video[] = [];

  public getVideo(id: string): Observable <any> {
    const url = `${this.apiURL}?q=v=${id}&key=${this.apiKey}&part=snippet&type=video&maxResults=10`;
    console.log(url);
    return this.http.get(url)
      .pipe(
        map((response: any) => response)
      );
  }

  public saveVideo(item: Video): void {
    const stringVideosInLs = localStorage.getItem("Video List");

    if(stringVideosInLs != undefined) {
      this.videos = JSON.parse(stringVideosInLs);
    }
    this.videos.push(item);
    localStorage.setItem("Video List", JSON.stringify(this.videos))
    this.videosList$.next(this.videos);
    this.video$.next(item);
  }

  public getVideosList(): Subject<Video[]> { 
    const stringVideosInLs = localStorage.getItem("Video List");

    if(stringVideosInLs != undefined) {
      this.videos = JSON.parse(stringVideosInLs);
    }
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

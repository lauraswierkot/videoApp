import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Video } from './video';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  private apiURL: string = environment.ytURL;
  private apiKey: string = environment.ytKey;

  public getVideo(id: string): Observable<Video> {
    id = this.getYoutubeVideoID(id);
    const url = `${this.apiURL}?q=v=${id}&key=${this.apiKey}&part=snippet&type=video&maxResults=10`;
    return this.http
      .get(url)
      .pipe(
        map(
          (value: any) =>
            new Video(
              id,
              value.items[0].snippet.title,
              value.items[0].snippet.description,
              value.items[0].snippet.thumbnails.medium.url
            )
        )
      );
  }

  private getYoutubeVideoID(url: string): string {
    const regex =
      /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return url.replace(regex, `$1`);
  }
}

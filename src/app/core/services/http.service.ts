import { Injectable } from '@angular/core';

import { Video } from '../model/video';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IVimeo {
  name: string;
  description: string;
  pictures: { base_link: string };
}

interface IYouTube {
  items: [
    {
      snippet: {
        title: string;
        description: string;
        thumbnails: { medium: { url: string } };
      };
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public videosList$: Subject<Video[]> = new BehaviorSubject<Video[]>([]);
  public video$: Subject<Video> = new Subject<Video>();
  private vimeoURL: string = environment.vimeoURL;
  private vimeoKey: string = environment.vimeoKey;
  private youtubeURL: string = environment.ytURL;
  private youtubeKey: string = environment.ytKey;

  constructor(private http: HttpClient) {}

  public getVimeoVideo(id: string): Observable<Video> {
    const url = `${this.vimeoURL}/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.vimeoKey}`,
    });
    return this.http.get<IVimeo>(url, { headers: headers }).pipe(
      map(
        (response) =>
          ({
            id: id,
            title: response.name,
            description: response.description,
            thumbnail: response.pictures.base_link,
          } as Video)
      )
    );
  }

  public getYoutubeVideo(id: string): Observable<Video> {
    id = this.getYoutubeVideoId(id);
    const url = `${this.youtubeURL}?q=v=${id}&key=${this.youtubeKey}&part=snippet&type=video&maxResults=10`;
    return this.http.get<IYouTube>(url).pipe(
      map(
        (response) =>
          ({
            id: id,
            title: response.items[0]?.snippet?.title,
            description: response.items[0]?.snippet?.description,
            thumbnail: response.items[0]?.snippet?.thumbnails?.medium?.url,
          } as Video)
      )
    );
  }

  private getYoutubeVideoId(url: string): string {
    const regex =
      /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return url.replace(regex, `$1`);
  }
}

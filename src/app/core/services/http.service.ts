import { Injectable } from '@angular/core';

import { Video } from '../model/video';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IVimeo {
  name: string;
  pictures: { base_link: string };
  metadata: { connections: { likes: { total: number } } };
}

interface IYouTube {
  items: [
    {
      snippet: {
        title: string;
        thumbnails: { medium: { url: string } };
      };
      statistics: {
        likeCount: string;
        viewCount: string;
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
    const url = `${this.vimeoURL}/${id}?action=load_stat_counts`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.vimeoKey}`,
    });
    return this.http.get<IVimeo>(url, { headers: headers }).pipe(
      map((response) => ({
        id: id,
        title: response.name,
        thumbnail: response.pictures.base_link,
        likeCount: response.metadata.connections.likes.total.toString(),
      }))
    );
  }

  public getYoutubeVideo(id: string): Observable<Video> {
    id = this.getYoutubeVideoId(id);
    const url = `${this.youtubeURL}?id=${id}&key=${this.youtubeKey}&part=snippet,statistics&fields=items(id,snippet(title,thumbnails),statistics(viewCount,likeCount))`;
    return this.http.get<IYouTube>(url).pipe(
      map((response) => ({
        id: id,
        title: response.items[0]?.snippet?.title,
        thumbnail: response.items[0]?.snippet?.thumbnails?.medium?.url,
        likeCount: response.items[0]?.statistics?.likeCount,
        viewCount: response.items[0]?.statistics?.viewCount,
      }))
    );
  }

  private getYoutubeVideoId(url: string): string {
    const regex =
      /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return url.replace(regex, `$1`);
  }
}

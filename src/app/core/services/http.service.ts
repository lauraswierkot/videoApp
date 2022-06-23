import { Injectable } from '@angular/core';

import { Video } from '../model/video';
import { BehaviorSubject, Observable, map } from 'rxjs';
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
  private vimeoUrl: string = environment.vimeoUrl;
  private vimeoKey: string = environment.vimeoKey;
  private youtubeUrl: string = environment.ytUrl;
  private youtubeKey: string = environment.ytKey;

  constructor(private http: HttpClient) {}

  public getVimeoVideo(id: string): Observable<Video> {
    let vimeoId = this.getVimeoVideoId(id);
    const url = `${this.vimeoUrl}/${vimeoId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.vimeoKey}`,
    });
    return this.http.get<IVimeo>(url, { headers: headers }).pipe(
      map((response) => ({
        id: id,
        title: response.name,
        thumbnail: response.pictures.base_link,
        likeCount: response.metadata.connections.likes.total.toString(),
        createdAt: new Date(),
        isFavorite: false
      }))
    );
  }

  public getYoutubeVideo(id: string): Observable<Video> {

    let youtubeId = this.getYoutubeVideoId(id);
    const url = `${this.youtubeUrl}?id=${youtubeId}&key=${this.youtubeKey}&part=snippet,statistics&fields=items(id,snippet(title,thumbnails),statistics(viewCount,likeCount))`;
    return this.http.get<IYouTube>(url).pipe(
      map((response) => ({
        id: id,
        title: response.items[0]?.snippet?.title,
        thumbnail: response.items[0]?.snippet?.thumbnails?.medium?.url,
        likeCount: response.items[0]?.statistics?.likeCount,
        viewCount: response.items[0]?.statistics?.viewCount,
        createdAt: new Date(),
        isFavorite: false
      }))
    );
  }

  private getYoutubeVideoId(url: string): string {
    const regex =
      /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return url.replace(regex, `$1`);
  }

  private getVimeoVideoId(url: string): string {
    const regex = 
    /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
    return url.length > 8 ? url.match(regex)![1] : url;
  }
}

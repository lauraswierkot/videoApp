import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Video } from './video';

@Injectable({
  providedIn: 'root',
})
export class VimeoService {
  constructor(private http: HttpClient) {}

  private apiURL: string = environment.vimeoURL;
  private apiKey: string = environment.vimeoKey;

  public getVideo(id: string): Observable<Video> {
    const url = `${this.apiURL}/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    });
    return this.http
      .get(url, { headers: headers })
      .pipe(
        map(
          (value: any) =>
            new Video(
              id,
              value.name,
              value.description,
              value.pictures.base_link
            )
        )
      );
  }
}

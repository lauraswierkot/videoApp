import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiURL = environment.apiURL;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable <any> {
    const url = `${this.apiURL}?q=v=${query}&key=${this.apiKey}&part=snippet&type=video&maxResults=10`;
    console.log(url);
    return this.http.get(url)
      .pipe(
        map((response: any) => response)
      );
  }
}

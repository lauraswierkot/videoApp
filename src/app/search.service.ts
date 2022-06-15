import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiURL = 'https://www.googleapis.com/youtube/v3/search';
  private apiKey = 'AIzaSyCKw2tFUYiwJTYbyyKnfe-VkyIVWMC5MvU';

  constructor(public http: HttpClient) { }

  getVideos(query: string): Observable <any> {
    const url = `${this.apiURL}?q=v=${query}&key=${this.apiKey}&part=snippet&type=video&maxResults=10`;
    console.log(url);
    return this.http.get(url)
      .pipe(
        map((response: any) => response)
      );
  }
}

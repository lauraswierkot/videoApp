import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VimeoService {
  constructor(private http: HttpClient) {}

  private apiURL: string = environment.vimeoURL;
  private apiKey: string = environment.vimeoKey;

  public getVideo(id: string): void {
    //to be completed
  }
}

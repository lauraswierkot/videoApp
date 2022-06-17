import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/core/model/video';
import { HttpService } from 'src/app/core/model/http.service';

@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  constructor(private httpService : HttpService) {}
  public videoList: Video[] = [];
  
  public ngOnInit(): void {
    this.httpService.getVideosList().subscribe(value => { 
      this.videoList = value 
    });
  }
}

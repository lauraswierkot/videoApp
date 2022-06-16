import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/core/video';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  constructor(private sharedService : SharedService) { }
  public videoList: Video[] = [];
  

  public ngOnInit(): void {
    this.sharedService.getVideos().subscribe(value => this.videoList.push(value));
  }

  public removeItem(index: number): void {
    if(index > -1)
    {
      this.videoList.splice(index, 1);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/core/model/video';
import { VideoService } from 'src/app/core';

@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  public videoList: Video[] = [];

  constructor(private videoService: VideoService) {}

  public ngOnInit(): void {
    this.videoService.getVideosList().subscribe((value) => {
      this.videoList = value;
    });
  }
}

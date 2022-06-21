import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Video } from 'src/app/core/model/video';
import { VideoService } from 'src/app/core';

@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  @Input() video: Video;
  public videoList: Video[] = [];

  constructor(private videoService: VideoService) {}

  public ngOnInit(): void {
    this.videoService.getVideosList().subscribe((value) => {
      this.videoList = value;
    });
  }

  public ngOnDestroy(): void {
    this.videoService.getVideosList().unsubscribe();
  }

  public delete(id: string): void {
    this.videoService.deleteVideo(id);
  }

  public setAsFavorite(id: string): void {
    this.videoService.setAsFavorite(id);
  }
}

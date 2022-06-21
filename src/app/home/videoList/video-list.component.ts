import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Video } from 'src/app/core/model/video';
import { FacadeService } from 'src/app/core';

@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  @Input() video: Video;
  public videoList: Video[] = [];

  constructor(private facadeService: FacadeService) {}

  public ngOnInit(): void {
    this.facadeService.getVideosList().subscribe((value) => {
      this.videoList = value;
    });
  }

  public ngOnDestroy(): void {
    this.facadeService.getVideosList().unsubscribe();
  }

  public delete(id: string): void {
    this.facadeService.deleteVideo(id);
  }

  public setAsFavorite(id: string): void {
    this.facadeService.setAsFavorite(id);
  }
}

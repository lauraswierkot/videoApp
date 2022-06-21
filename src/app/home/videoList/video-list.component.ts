import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Video } from 'src/app/core/model/video';
import { FacadeService } from 'src/app/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
    this.facadeService.videoList$
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.videoList = value;
      });
  }

  public ngOnDestroy(): void {
    this.facadeService.videoList$.unsubscribe();
  }

  public delete(id: string): void {
    this.facadeService.deleteVideo(id);
  }

  public setAsFavorite(id: string): void {
    this.facadeService.setAsFavorite(id);
  }
}

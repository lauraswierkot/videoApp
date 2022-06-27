import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Video } from 'src/app/core/model/video';
import { FacadeService, VideoType } from 'src/app/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { VideoDialogComponent } from './video-list-item/video-dialog/video-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  public videoList: Video[] = [];

  constructor(
    private dialog: MatDialog,
    private facadeService: FacadeService
  ) {}

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

  public playVideo(url: string): void {
    const videoData = this.facadeService.getVideoIdForPlayer(url);
    let playerUrl = '';

    if (videoData.videoType === VideoType.YOUTUBE) {
      playerUrl = `https://www.youtube.com/embed/${videoData.id}`;
    }
    if (videoData.videoType === VideoType.VIMEO) {
      playerUrl = `https://player.vimeo.com/video/${videoData.id}`;
    }
    this.openDialog(playerUrl);
  }

  public openDialog(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    dialogConfig.disableClose = false;
    this.dialog.open(VideoDialogComponent, dialogConfig);
  }
}

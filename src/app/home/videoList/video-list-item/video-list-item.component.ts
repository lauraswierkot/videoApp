import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FacadeService, Video } from 'src/app/core';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css'],
})
export class VideoListItemComponent {
  @Input() video: Video;
  @Output() videoDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() videoFavourite: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private facadeService: FacadeService
  ) {}

  public delete(id: string): void {
    this.videoDeleted.emit(id);
  }

  public setAsFavorite(id: string): void {
    this.videoFavourite.emit(id);
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.getUrl();
    dialogConfig.disableClose = false;
    this.dialog.open(VideoDialogComponent, dialogConfig);
  }

  public getUrl(): string {
    let id = this.video.id;
    const ytIdDigitsLength: number = 11;
    if (id.length == ytIdDigitsLength || id.includes('you')) {
      id = this.facadeService.getYoutubeVideoId(id);
      return `https://www.youtube.com/embed/${id}`;
    } else {
      return `https://player.vimeo.com/video/${id}`;
    }
  }
}

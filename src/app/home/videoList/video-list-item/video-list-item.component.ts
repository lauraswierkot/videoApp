import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from 'src/app/core';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css'],
})
export class VideoListItemComponent {
  @Input() video: Video;
  @Input() displayType: string;
  @Output() videoDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() videoFavorite: EventEmitter<string> = new EventEmitter<string>();
  @Output() videoPlayer: EventEmitter<string> = new EventEmitter<string>();
  @Output() videoPage: EventEmitter<string> = new EventEmitter<string>();

  public delete(id: string): void {
    this.videoDeleted.emit(id);
  }

  public setAsFavorite(id: string): void {
    this.videoFavorite.emit(id);
  }

  public playVideo(id: string): void {
    this.videoPlayer.emit(id);
  }

  public getVideo(id: string): void {
    this.videoPage.emit(id);
  }
}
